/* ============================================================
   home.js — render de secciones + buscador/filtros/mapa
   ============================================================ */
(function () {
  const PROPS = window.PROPIEDADES;
  const ZONAS = window.ZONAS;

  /* ---------- Render: Destacadas ---------- */
  function renderFeatured() {
    const wrap = document.getElementById("featuredGrid");
    if (!wrap) return;
    const list = PROPS.filter((p) => p.destacada).slice(0, 6);
    wrap.innerHTML = list.map(cardHTML).join("");
  }

  /* ---------- Render: Signature ---------- */
  function renderSignature() {
    const wrap = document.getElementById("signatureList");
    if (!wrap) return;
    const list = PROPS.filter((p) => p.signature).sort((a, b) => b.precio_venta_mxn - a.precio_venta_mxn);
    wrap.innerHTML = list.map((p, i) => {
      const meta = [];
      if (p.recamaras) meta.push(`<div><div class="k">${STATE.lang==="en"?"Bedrooms":"Recámaras"}</div><div class="v">${p.recamaras}</div></div>`);
      if (p.m2_construccion) meta.push(`<div><div class="k">${STATE.lang==="en"?"Built":"Construcción"}</div><div class="v">${p.m2_construccion}<span style="font-size:.9rem"> m²</span></div></div>`);
      if (p.m2_terreno) meta.push(`<div><div class="k">${STATE.lang==="en"?"Lot":"Terreno"}</div><div class="v">${p.m2_terreno}<span style="font-size:.9rem"> m²</span></div></div>`);
      return `
      <article class="signature__item reveal">
        <div class="signature__media reveal-img">
          <a href="propiedad.html?id=${p.slug}" aria-label="${propTitle(p)}" style="position:absolute;inset:0;z-index:3"></a>
          <span class="signature__index">${String(i + 1).padStart(2, "0")} — Signature</span>
          <img src="${propCover(p)}" alt="${propTitle(p)}" loading="lazy">
        </div>
        <div class="signature__body">
          <span class="h-eyebrow">${p.zona}</span>
          <h3>${propTitle(p)}</h3>
          <div class="signature__price">${fmtPriceCompact(p.precio_venta_mxn)}</div>
          <p class="signature__desc">${propDesc(p).slice(0, 220)}…</p>
          <div class="signature__meta">${meta.join("")}</div>
          <a class="btn btn--gold" href="propiedad.html?id=${p.slug}"><span data-i18n="sig.ver">${t("sig.ver")}</span></a>
        </div>
      </article>`;
    }).join("");
  }

  /* ---------- Render: Zonas ---------- */
  function renderZones() {
    const wrap = document.getElementById("zonesGrid");
    if (!wrap) return;
    wrap.innerHTML = ZONAS.map((z) => {
      const count = zoneCount(z.key);
      const word = count === 1 ? t("zonas.prop") : t("zonas.props");
      return `
      <a class="zone-card reveal" href="#buscar" data-zone="${z.key}">
        <img src="assets/img/propiedades/${z.cover}/foto-1.jpg" alt="${z.nombre}" loading="lazy">
        <div class="zone-card__body">
          <div class="zone-card__name">${z.nombre}</div>
          <div class="zone-card__count">${count} ${word}</div>
        </div>
      </a>`;
    }).join("");
    wrap.querySelectorAll("[data-zone]").forEach((el) => {
      el.addEventListener("click", () => { FILTERS.zona = el.dataset.zona; syncControls(); apply(); });
    });
  }

  /* ============================================================
     BUSCADOR / FILTROS
     ============================================================ */
  const PRICE_MIN = 0, PRICE_MAX = 50000000;
  const FILTERS = { op: "venta", zona: "", tipo: "", rec: 0, banos: 0, q: "", pmin: PRICE_MIN, pmax: PRICE_MAX, sort: "relevant" };
  let view = "grid";
  let map = null, markers = {}, mapInited = false;

  function fillSelectOptions() {
    const zonaSel = document.querySelectorAll(".js-f-zona");
    const tipos = [...new Set(PROPS.map((p) => p.tipo))];
    zonaSel.forEach((sel) => {
      sel.innerHTML = `<option value="">${t("f.cualquiera")}</option>` + ZONAS.map((z) => `<option value="${z.key}">${z.nombre}</option>`).join("");
    });
    document.querySelectorAll(".js-f-tipo").forEach((sel) => {
      sel.innerHTML = `<option value="">${t("f.cualquiera")}</option>` + tipos.map((tp) => `<option value="${tp}">${tp}</option>`).join("");
    });
  }

  function getFiltered() {
    let list = PROPS.filter((p) => {
      if (FILTERS.op === "renta" && !p.operacion.includes("renta")) return false;
      if (FILTERS.op === "venta" && !p.operacion.includes("venta")) return false;
      if (FILTERS.zona && p.zonaKey !== FILTERS.zona) return false;
      if (FILTERS.tipo && p.tipo !== FILTERS.tipo) return false;
      if (FILTERS.rec && p.recamaras < FILTERS.rec) return false;
      if (FILTERS.banos && p.banos < FILTERS.banos) return false;
      const price = FILTERS.op === "renta" ? (p.precio_renta_mxn || 0) : p.precio_venta_mxn;
      if (FILTERS.op === "venta" && (price < FILTERS.pmin || price > FILTERS.pmax)) return false;
      if (FILTERS.q) {
        const hay = (p.titulo + " " + p.titulo_en + " " + p.zona + " " + p.id + " " + p.tipo + " " + p.descripcion).toLowerCase();
        if (!hay.includes(FILTERS.q.toLowerCase())) return false;
      }
      return true;
    });
    const idx = (p) => PROPS.indexOf(p);
    switch (FILTERS.sort) {
      case "priceAsc": list.sort((a, b) => a.precio_venta_mxn - b.precio_venta_mxn); break;
      case "priceDesc": list.sort((a, b) => b.precio_venta_mxn - a.precio_venta_mxn); break;
      case "recent": list.sort((a, b) => idx(a) - idx(b)); break;
      default: list.sort((a, b) => (b.destacada - a.destacada) || (b.precio_venta_mxn - a.precio_venta_mxn));
    }
    return list;
  }

  function renderActiveFilter() {
    const bar = document.getElementById("activeFilter");
    const name = document.getElementById("activeFilterName");
    if (!bar) return;
    if (FILTERS.zona) {
      const z = ZONAS.find((x) => x.key === FILTERS.zona);
      if (name) name.textContent = z ? z.nombre : "";
      bar.style.display = "flex";
    } else {
      bar.style.display = "none";
    }
  }

  function apply() {
    const list = getFiltered();
    const grid = document.getElementById("resultsGrid");
    const count = document.getElementById("resultsCount");
    const empty = document.getElementById("emptyState");
    if (count) count.innerHTML = `<b>${list.length}</b> ${list.length === 1 ? t("results.prop") : t("results.props")}`;
    if (list.length === 0) {
      grid.innerHTML = "";
      empty.style.display = "block";
    } else {
      empty.style.display = "none";
      grid.innerHTML = list.map(cardHTML).join("");
    }
    renderActiveFilter();
    document.dispatchEvent(new Event("content:rendered"));
    updateMap(list);
  }

  /* ---------- Slider de precio dual ---------- */
  function initPriceRange() {
    const pop = document.querySelector(".range-pop");
    if (!pop) return;
    const min = pop.querySelector(".r-min"), max = pop.querySelector(".r-max");
    const fill = pop.querySelector(".track-fill");
    const lblMin = pop.querySelector(".rv-min"), lblMax = pop.querySelector(".rv-max");
    const summary = pop.querySelector(".range-summary");
    function update() {
      let a = +min.value, b = +max.value;
      if (a > b - 1000000) { if (event && event.target === min) a = b - 1000000; else b = a + 1000000; min.value = a; max.value = b; }
      FILTERS.pmin = a; FILTERS.pmax = b;
      const pa = (a - PRICE_MIN) / (PRICE_MAX - PRICE_MIN) * 100;
      const pb = (b - PRICE_MIN) / (PRICE_MAX - PRICE_MIN) * 100;
      fill.style.left = pa + "%"; fill.style.width = (pb - pa) + "%";
      lblMin.textContent = fmtPriceCompact(a); lblMax.textContent = b >= PRICE_MAX ? fmtPriceCompact(b) + "+" : fmtPriceCompact(b);
      if (summary) summary.textContent = fmtPriceCompact(a) + " – " + (b >= PRICE_MAX ? fmtPriceCompact(b) + "+" : fmtPriceCompact(b));
    }
    [min, max].forEach((r) => { r.min = PRICE_MIN; r.max = PRICE_MAX; r.step = 500000; r.addEventListener("input", () => { update(); apply(); }); });
    min.value = PRICE_MIN; max.value = PRICE_MAX; update();
    const toggle = pop.querySelector(".range-trigger");
    toggle.addEventListener("click", (e) => { e.stopPropagation(); pop.classList.toggle("is-open"); });
    document.addEventListener("click", (e) => { if (!pop.contains(e.target)) pop.classList.remove("is-open"); });
    document.addEventListener("i18n:changed", update);
  }

  /* ---------- Mapa Leaflet ---------- */
  function initMap() {
    if (mapInited || typeof L === "undefined") return;
    const el = document.getElementById("resultsMap");
    if (!el) return;
    map = L.map(el, { scrollWheelZoom: false, zoomControl: true }).setView([CONFIG.mapCenter.lat, CONFIG.mapCenter.lng], CONFIG.mapCenter.zoom);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; OpenStreetMap &copy; CARTO', maxZoom: 19
    }).addTo(map);
    mapInited = true;
    updateMap(getFiltered());
  }

  function updateMap(list) {
    if (!mapInited || !map) return;
    Object.values(markers).forEach((m) => map.removeLayer(m));
    markers = {};
    const bounds = [];
    list.forEach((p) => {
      const icon = L.divIcon({ className: "", html: `<div class="leaflet-pin" data-slug="${p.slug}">${fmtPriceCompact(p.precio_venta_mxn)}</div>`, iconSize: null });
      const m = L.marker([p.coords.lat, p.coords.lng], { icon }).addTo(map);
      m.bindPopup(`
        <div class="map-popup">
          <img class="mp-img" src="${propCover(p)}" alt="">
          <div class="mp-title">${propTitle(p)}</div>
          <div class="mp-price">${fmtPriceCompact(p.precio_venta_mxn)} · ${p.zona}</div>
          <a href="propiedad.html?id=${p.slug}">${t("sig.ver")} →</a>
        </div>`, { minWidth: 220 });
      m.on("mouseover", () => m.openPopup());
      markers[p.slug] = m;
      bounds.push([p.coords.lat, p.coords.lng]);
    });
    if (bounds.length) map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
  }

  function setView(v) {
    view = v;
    const layout = document.getElementById("resultsLayout");
    layout.classList.toggle("has-map", v === "map");
    document.querySelectorAll(".js-view").forEach((b) => b.classList.toggle("is-active", b.dataset.view === v));
    if (v === "map") { initMap(); setTimeout(() => map && map.invalidateSize(), 250); }
  }

  /* ---------- Sincronizar controles con FILTERS ---------- */
  function syncControls() {
    document.querySelectorAll(".js-f-zona").forEach((s) => (s.value = FILTERS.zona));
    document.querySelectorAll(".js-f-tipo").forEach((s) => (s.value = FILTERS.tipo));
    document.querySelectorAll(".js-f-rec").forEach((s) => (s.value = FILTERS.rec));
    document.querySelectorAll(".js-f-banos").forEach((s) => (s.value = FILTERS.banos));
    document.querySelectorAll(".js-f-q").forEach((s) => (s.value = FILTERS.q));
    document.querySelectorAll(".js-op").forEach((b) => b.classList.toggle("is-active", b.dataset.op === FILTERS.op));
  }

  /* ---------- Wire de controles ---------- */
  function wireControls() {
    document.querySelectorAll(".js-op").forEach((b) => b.addEventListener("click", () => {
      FILTERS.op = b.dataset.op; syncControls(); apply();
      // mostrar/ocultar precio en renta
      document.querySelectorAll(".range-pop").forEach((p) => p.style.display = FILTERS.op === "renta" ? "none" : "");
    }));
    document.querySelectorAll(".js-f-zona").forEach((s) => s.addEventListener("change", () => { FILTERS.zona = s.value; syncControls(); apply(); }));
    document.querySelectorAll(".js-f-tipo").forEach((s) => s.addEventListener("change", () => { FILTERS.tipo = s.value; syncControls(); apply(); }));
    document.querySelectorAll(".js-f-rec").forEach((s) => s.addEventListener("change", () => { FILTERS.rec = +s.value; syncControls(); apply(); }));
    document.querySelectorAll(".js-f-banos").forEach((s) => s.addEventListener("change", () => { FILTERS.banos = +s.value; syncControls(); apply(); }));
    let qt;
    document.querySelectorAll(".js-f-q").forEach((s) => s.addEventListener("input", () => { clearTimeout(qt); qt = setTimeout(() => { FILTERS.q = s.value; apply(); }, 200); }));
    const sortSel = document.getElementById("sortSelect");
    if (sortSel) sortSel.addEventListener("change", () => { FILTERS.sort = sortSel.value; apply(); });
    document.querySelectorAll(".js-view").forEach((b) => b.addEventListener("click", () => setView(b.dataset.view)));
    function clearAll() {
      Object.assign(FILTERS, { zona: "", tipo: "", rec: 0, banos: 0, q: "", pmin: PRICE_MIN, pmax: PRICE_MAX });
      syncControls(); apply();
    }
    const reset = document.getElementById("emptyReset");
    if (reset) reset.addEventListener("click", clearAll);
    const clearChip = document.getElementById("activeFilterClear");
    if (clearChip) clearChip.addEventListener("click", clearAll);
  }

  /* ---------- Re-render al cambiar idioma/moneda ---------- */
  document.addEventListener("i18n:changed", () => {
    renderFeatured(); renderSignature(); renderZones();
    fillSelectOptions(); syncControls();
    const sortSel = document.getElementById("sortSelect");
    if (sortSel) sortSel.value = FILTERS.sort;
    apply();
  });

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    renderFeatured(); renderSignature(); renderZones();
    fillSelectOptions(); wireControls(); initPriceRange(); syncControls(); apply();

    // Hero slideshow
    const slides = document.querySelectorAll(".hero__slide");
    if (slides.length > 1) {
      let i = 0; slides[0].classList.add("is-active");
      setInterval(() => { slides[i].classList.remove("is-active"); i = (i + 1) % slides.length; slides[i].classList.add("is-active"); }, 5500);
    }

    // Parallax sutil en hero media
    const media = document.querySelector(".hero__media, .hero__slides");
    if (media) window.addEventListener("scroll", () => { const y = window.scrollY; if (y < window.innerHeight) media.style.transform = `translateY(${y * 0.18}px)`; }, { passive: true });

    // Mapa siempre visible: se inicializa al acercarse a la sección de cartera
    const buscar = document.getElementById("buscar");
    if (buscar) new IntersectionObserver((es, o) => {
      if (es[0].isIntersecting) { initMap(); setTimeout(() => map && map.invalidateSize(), 200); o.disconnect(); }
    }, { rootMargin: "300px" }).observe(buscar);
  });
})();
