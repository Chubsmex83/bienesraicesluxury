/* ============================================================
   detail.js — página de detalle de propiedad
   ============================================================ */
(function () {
  function getParam(name) { return new URLSearchParams(location.search).get(name); }
  const slug = getParam("id");
  const p = (window.PROPIEDADES || []).find((x) => x.slug === slug) || window.PROPIEDADES[0];
  const agente = window.AGENTES[p.agente] || window.AGENTES.mariana;
  let photos = propPhotos(p);
  let map = null;

  function specRows() {
    const rows = [];
    if (p.recamaras) rows.push([p.recamaras, "detail.recamaras"]);
    if (p.banos) rows.push([p.banos, "detail.banos"]);
    if (p.medios_banos) rows.push([p.medios_banos, "detail.medios"]);
    if (p.estacionamientos) rows.push([p.estacionamientos, "detail.estac"]);
    if (p.m2_construccion) rows.push([p.m2_construccion + " m²", "detail.const"]);
    if (p.m2_terreno) rows.push([p.m2_terreno + " m²", "detail.terreno"]);
    if (p.pisos) rows.push([p.pisos, "detail.pisos"]);
    if (p.antiguedad) rows.push([p.antiguedad, "detail.antiguedad"]);
    rows.push([p.id, "detail.id"]);
    return rows.map((r) => `<div class="spec"><div class="v">${r[0]}</div><div class="k" data-i18n="${r[1]}">${t(r[1])}</div></div>`).join("");
  }

  function render() {
    document.title = propTitle(p) + " — Bienes Raíces Luxury";

    // Hero
    document.getElementById("dHeroImg").src = photos[0];
    document.getElementById("dZone").textContent = p.zona;
    document.getElementById("dTitle").textContent = propTitle(p);
    document.getElementById("dHeroZone").textContent = p.zona + " · " + p.tipo;
    document.getElementById("dCrumbTitle").textContent = propTitle(p);

    // Barra precio
    const rent = p.precio_renta_mxn ? `<span class="rent">/ ${fmtPrice(p.precio_renta_mxn)} ${STATE.lang === "en" ? "rent/mo" : "renta/mes"}</span>` : "";
    document.getElementById("dPrice").innerHTML = fmtPrice(p.precio_venta_mxn) + rent;

    // Specs
    document.getElementById("dSpecs").innerHTML = specRows();

    // Descripción
    document.getElementById("dDesc").textContent = propDesc(p);

    // Amenidades
    document.getElementById("dAmenities").innerHTML = p.amenidades.map((a) => `<li>${a}</li>`).join("");

    // Galería strip (hasta 8, con "+N")
    const strip = document.getElementById("dGallery");
    const shown = photos.slice(1, 9);
    strip.innerHTML = shown.map((src, i) => {
      const isLast = i === shown.length - 1 && photos.length > 9;
      const more = isLast ? `<span class="more">+${photos.length - 9}</span>` : "";
      return `<button data-idx="${i + 1}"><img src="${src}" alt="${propTitle(p)} — foto ${i + 2}" loading="lazy">${more}</button>`;
    }).join("");
    strip.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => openLightbox(+b.dataset.idx)));

    // Agente
    const avatar = document.getElementById("dAgentAvatar");
    avatar.textContent = agente.nombre.split(" ").map((w) => w[0]).slice(0, 2).join("");
    document.getElementById("dAgentName").textContent = agente.nombre;
    const roleEl = document.getElementById("dAgentRole");
    const roleTxt = STATE.lang === "en" ? agente.rol_en : agente.rol;
    roleEl.textContent = roleTxt || "";
    roleEl.style.display = roleTxt ? "" : "none";

    // WhatsApp / contacto
    const waText = `Hola, me interesa la propiedad "${propTitle(p)}" (${p.id}) — ${fmtPrice(p.precio_venta_mxn)}. ¿Podemos agendar una visita?`;
    document.getElementById("dWa").href = waLink(waText);
    document.getElementById("dWaBar").href = waLink(waText);

    // Relacionadas (misma zona o tipo, distinta)
    const rel = window.PROPIEDADES.filter((x) => x.slug !== p.slug && (x.zonaKey === p.zonaKey || x.tipo === p.tipo)).slice(0, 3);
    const relList = rel.length ? rel : window.PROPIEDADES.filter((x) => x.slug !== p.slug).slice(0, 3);
    document.getElementById("dRelated").innerHTML = relList.map(cardHTML).join("");

    document.dispatchEvent(new Event("content:rendered"));
    initMap();
  }

  /* ---------- Lightbox ---------- */
  let lbIndex = 0;
  function openLightbox(i) {
    lbIndex = i;
    const lb = document.getElementById("lightbox");
    document.getElementById("lbImg").src = photos[lbIndex];
    document.getElementById("lbCount").textContent = (lbIndex + 1) + " / " + photos.length;
    lb.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() { document.getElementById("lightbox").classList.remove("is-open"); document.body.style.overflow = ""; }
  function nav(d) { lbIndex = (lbIndex + d + photos.length) % photos.length; document.getElementById("lbImg").src = photos[lbIndex]; document.getElementById("lbCount").textContent = (lbIndex + 1) + " / " + photos.length; }

  /* ---------- Mapa ---------- */
  function initMap() {
    if (map || typeof L === "undefined") return;
    const el = document.getElementById("detailMap");
    if (!el) return;
    map = L.map(el, { scrollWheelZoom: false }).setView([p.coords.lat, p.coords.lng], 14);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", { attribution: "&copy; OpenStreetMap &copy; CARTO", maxZoom: 19 }).addTo(map);
    const icon = L.divIcon({ className: "", html: `<div class="leaflet-pin is-active">${fmtPriceCompact(p.precio_venta_mxn)}</div>` });
    L.marker([p.coords.lat, p.coords.lng], { icon }).addTo(map);
  }

  /* ---------- Eventos ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    render();
    document.getElementById("dGalleryBtn").addEventListener("click", () => openLightbox(0));
    document.getElementById("dHeroImg").parentElement.addEventListener("click", () => openLightbox(0));
    document.getElementById("lbClose").addEventListener("click", closeLightbox);
    document.getElementById("lbPrev").addEventListener("click", () => nav(-1));
    document.getElementById("lbNext").addEventListener("click", () => nav(1));
    document.getElementById("lightbox").addEventListener("click", (e) => { if (e.target.id === "lightbox") closeLightbox(); });
    document.addEventListener("keydown", (e) => {
      if (!document.getElementById("lightbox").classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") nav(-1);
      if (e.key === "ArrowRight") nav(1);
    });

    // Form -> WhatsApp
    document.getElementById("dAgentForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.target;
      const msg = `Hola ${agente.nombre.split(" ")[0]}, soy ${f.nombre.value}. Me interesa "${propTitle(p)}" (${p.id}). ${f.msg.value || ""} | Tel: ${f.tel.value || "—"}`;
      window.open(waLink(msg), "_blank");
    });

    // WhatsApp flotante
    const wf = document.getElementById("waFloat");
    if (wf) wf.href = waLink(`Hola, me interesa la propiedad ${propTitle(p)} (${p.id}).`);
    const yr = document.getElementById("year"); if (yr) yr.textContent = new Date().getFullYear();
  });

  // Re-render con idioma/moneda
  document.addEventListener("i18n:changed", render);
})();
