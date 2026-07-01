/* ============================================================
   ui.js — núcleo compartido
   i18n (ES/EN), moneda (MXN/USD), header, cursor, reveals, helpers
   ============================================================ */

/* ---------- Estado global ---------- */
const STATE = {
  lang: localStorage.getItem("brl-lang") || "es",
  currency: localStorage.getItem("brl-curr") || "MXN"
};

/* ---------- Diccionario i18n (UI chrome) ---------- */
const I18N = {
  es: {
    "nav.propiedades": "Propiedades", "nav.signature": "Signature", "nav.zonas": "Zonas",
    "nav.buscar": "Buscar", "nav.cartera": "Cartera", "nav.nosotros": "Nosotros", "nav.contacto": "Contacto",
    "hero.eyebrow": "San Pedro Garza García · Nuevo León",
    "hero.title": "Vivir entre la sierra y la sofisticación.",
    "hero.sub": "Una colección curada de residencias y departamentos de autor en las zonas más codiciadas de San Pedro. Bienes raíces como una experiencia editorial.",
    "hero.cta": "Explorar la colección",
    "op.comprar": "Comprar", "op.rentar": "Rentar",
    "f.zona": "Zona", "f.tipo": "Tipo", "f.rec": "Recámaras", "f.banos": "Baños",
    "f.buscar": "Palabra clave / ID", "f.cualquiera": "Cualquiera", "f.buscarBtn": "Buscar",
    "f.presupuesto": "Presupuesto", "f.m2c": "m² construcción", "f.m2t": "m² terreno",
    "scroll": "Scroll",
    "stat.props": "Propiedades exclusivas", "stat.zonas": "Zonas premium",
    "stat.valor": "En inventario", "stat.años": "Años en San Pedro",
    "feat.eyebrow": "Selección", "feat.title": "Propiedades destacadas",
    "feat.sub": "Lo más solicitado de nuestra cartera esta temporada.",
    "feat.all": "Ver todas las propiedades",
    "sig.eyebrow": "Colección Signature", "sig.title": "Las residencias que definen el lujo en Monterrey",
    "sig.sub": "Cuatro direcciones excepcionales, tratadas con el detalle que merecen.",
    "sig.ver": "Ver residencia",
    "zonas.eyebrow": "El mapa del lujo", "zonas.title": "Explora por zonas",
    "zonas.sub": "Cada colonia con su propio carácter. Encuentra la tuya.",
    "zonas.props": "propiedades", "zonas.prop": "propiedad",
    "buscar.eyebrow": "Buscador inteligente", "buscar.title": "Encuentra tu próxima dirección",
    "cartera.eyebrow": "Nuestra cartera", "cartera.title": "Explora todas las propiedades",
    "filter.showing": "Mostrando", "filter.clear": "Ver todas",
    "results.de": "de", "results.props": "propiedades", "results.prop": "propiedad",
    "sort.label": "Ordenar", "sort.relevant": "Más relevantes", "sort.recent": "Recién agregadas",
    "sort.priceAsc": "Precio: menor a mayor", "sort.priceDesc": "Precio: mayor a menor",
    "view.grid": "Cuadrícula", "view.map": "Mapa",
    "empty.title": "Sin resultados", "empty.text": "No encontramos propiedades con esos criterios. Ajusta los filtros para descubrir más.",
    "empty.reset": "Limpiar filtros",
    "about.eyebrow": "Por qué elegirnos", "about.title": "Una boutique, no un portal.",
    "about.sub": "Representamos un número limitado de propiedades para dedicar a cada una —y a cada cliente— una atención sin concesiones.",
    "about.tag": "Tasa de satisfacción",
    "about.v1h": "Curaduría exclusiva", "about.v1p": "Cada propiedad es seleccionada a mano. Sin relleno, sin listings genéricos.",
    "about.v2h": "Conocimiento local", "about.v2p": "Vivimos San Pedro. Conocemos cada colonia, cada torre, cada calle.",
    "about.v3h": "Discreción total", "about.v3p": "Operaciones confidenciales y acompañamiento de principio a fin.",
    "testi.eyebrow": "Confianza", "testi.title": "Lo que dicen nuestros clientes",
    "press.eyebrow": "Como se vio en",
    "contact.eyebrow": "Hablemos", "contact.title": "Tu próxima dirección comienza con una conversación.",
    "contact.sub": "Cuéntanos qué buscas. Fabiola Sada te responderá en menos de 24 horas.",
    "contact.tel": "Teléfono", "contact.oficina": "Oficina", "contact.verMaps": "Ver en Google Maps →",
    "contact.intent": "¿En qué podemos ayudarte?",
    "contact.comprar": "Comprar", "contact.vender": "Vender", "contact.rentar": "Rentar", "contact.invertir": "Invertir",
    "form.nombre": "Nombre", "form.email": "Correo", "form.tel": "Teléfono",
    "form.zona": "Zona de interés", "form.msg": "Mensaje", "form.enviar": "Enviar solicitud",
    "form.msgPlaceholder": "Estoy buscando…",
    "wa.label": "Escríbenos por WhatsApp",
    "foot.tag": "Bienes raíces de lujo en San Pedro Garza García. Una experiencia editorial, dirección por dirección.",
    "foot.explore": "Explorar", "foot.zonas": "Zonas", "foot.contacto": "Contacto",
    "foot.privacy": "Aviso de privacidad", "foot.terms": "Términos", "foot.rights": "Todos los derechos reservados.",
    "detail.back": "Volver", "detail.gallery": "Ver galería", "detail.overview": "Descripción",
    "detail.amenities": "Amenidades", "detail.location": "Ubicación", "detail.specs": "Características",
    "detail.agent": "Tu asesor", "detail.schedule": "Agendar visita", "detail.contactAgent": "Contactar asesor",
    "detail.related": "También te puede interesar", "detail.whatsapp": "WhatsApp",
    "detail.recamaras": "Recámaras", "detail.banos": "Baños", "detail.medios": "Medios baños",
    "detail.estac": "Estacion.", "detail.const": "Construcción", "detail.terreno": "Terreno",
    "detail.pisos": "Pisos", "detail.antiguedad": "Antigüedad", "detail.id": "ID",
    "detail.formName": "Tu nombre", "detail.formPhone": "Teléfono", "detail.formMsg": "Mensaje",
    "badge.venta": "En Venta", "badge.renta": "En Renta", "badge.ventaRenta": "Venta / Renta", "badge.exclusiva": "Exclusiva",
    "price.desde": "Renta"
  },
  en: {
    "nav.propiedades": "Properties", "nav.signature": "Signature", "nav.zonas": "Areas",
    "nav.buscar": "Search", "nav.cartera": "Portfolio", "nav.nosotros": "About", "nav.contacto": "Contact",
    "hero.eyebrow": "San Pedro Garza García · Nuevo León",
    "hero.title": "Living between the sierra and sophistication.",
    "hero.sub": "A curated collection of signature residences and apartments in San Pedro's most coveted areas. Real estate as an editorial experience.",
    "hero.cta": "Explore the collection",
    "op.comprar": "Buy", "op.rentar": "Rent",
    "f.zona": "Area", "f.tipo": "Type", "f.rec": "Bedrooms", "f.banos": "Baths",
    "f.buscar": "Keyword / ID", "f.cualquiera": "Any", "f.buscarBtn": "Search",
    "f.presupuesto": "Budget", "f.m2c": "Built m²", "f.m2t": "Lot m²",
    "scroll": "Scroll",
    "stat.props": "Exclusive listings", "stat.zonas": "Premium areas",
    "stat.valor": "In inventory", "stat.años": "Years in San Pedro",
    "feat.eyebrow": "Selection", "feat.title": "Featured properties",
    "feat.sub": "The most requested from our portfolio this season.",
    "feat.all": "View all properties",
    "sig.eyebrow": "Signature Collection", "sig.title": "The residences that define luxury in Monterrey",
    "sig.sub": "Four exceptional addresses, treated with the detail they deserve.",
    "sig.ver": "View residence",
    "zonas.eyebrow": "The map of luxury", "zonas.title": "Explore by area",
    "zonas.sub": "Each neighborhood with its own character. Find yours.",
    "zonas.props": "properties", "zonas.prop": "property",
    "buscar.eyebrow": "Smart search", "buscar.title": "Find your next address",
    "cartera.eyebrow": "Our portfolio", "cartera.title": "Explore all properties",
    "filter.showing": "Showing", "filter.clear": "View all",
    "results.de": "of", "results.props": "properties", "results.prop": "property",
    "sort.label": "Sort", "sort.relevant": "Most relevant", "sort.recent": "Newest",
    "sort.priceAsc": "Price: low to high", "sort.priceDesc": "Price: high to low",
    "view.grid": "Grid", "view.map": "Map",
    "empty.title": "No results", "empty.text": "We couldn't find properties with those criteria. Adjust the filters to discover more.",
    "empty.reset": "Clear filters",
    "about.eyebrow": "Why choose us", "about.title": "A boutique, not a portal.",
    "about.sub": "We represent a limited number of properties so we can devote uncompromising attention to each one —and to each client.",
    "about.tag": "Satisfaction rate",
    "about.v1h": "Exclusive curation", "about.v1p": "Every property is hand-selected. No filler, no generic listings.",
    "about.v2h": "Local expertise", "about.v2p": "We live San Pedro. We know every neighborhood, every tower, every street.",
    "about.v3h": "Total discretion", "about.v3p": "Confidential transactions and guidance from start to finish.",
    "testi.eyebrow": "Trust", "testi.title": "What our clients say",
    "press.eyebrow": "As seen in",
    "contact.eyebrow": "Let's talk", "contact.title": "Your next address starts with a conversation.",
    "contact.sub": "Tell us what you're looking for. Fabiola Sada will reply within 24 hours.",
    "contact.tel": "Phone", "contact.oficina": "Office", "contact.verMaps": "View on Google Maps →",
    "contact.intent": "How can we help?",
    "contact.comprar": "Buy", "contact.vender": "Sell", "contact.rentar": "Rent", "contact.invertir": "Invest",
    "form.nombre": "Name", "form.email": "Email", "form.tel": "Phone",
    "form.zona": "Area of interest", "form.msg": "Message", "form.enviar": "Send request",
    "form.msgPlaceholder": "I'm looking for…",
    "wa.label": "Message us on WhatsApp",
    "foot.tag": "Luxury real estate in San Pedro Garza García. An editorial experience, address by address.",
    "foot.explore": "Explore", "foot.zonas": "Areas", "foot.contacto": "Contact",
    "foot.privacy": "Privacy policy", "foot.terms": "Terms", "foot.rights": "All rights reserved.",
    "detail.back": "Back", "detail.gallery": "View gallery", "detail.overview": "Overview",
    "detail.amenities": "Amenities", "detail.location": "Location", "detail.specs": "Features",
    "detail.agent": "Your advisor", "detail.schedule": "Schedule a visit", "detail.contactAgent": "Contact advisor",
    "detail.related": "You may also like", "detail.whatsapp": "WhatsApp",
    "detail.recamaras": "Bedrooms", "detail.banos": "Baths", "detail.medios": "Half baths",
    "detail.estac": "Parking", "detail.const": "Built", "detail.terreno": "Lot",
    "detail.pisos": "Floors", "detail.antiguedad": "Age", "detail.id": "ID",
    "detail.formName": "Your name", "detail.formPhone": "Phone", "detail.formMsg": "Message",
    "badge.venta": "For Sale", "badge.renta": "For Rent", "badge.ventaRenta": "Sale / Rent", "badge.exclusiva": "Exclusive",
    "price.desde": "Rent"
  }
};

function t(key) { return (I18N[STATE.lang] && I18N[STATE.lang][key]) || (I18N.es[key]) || key; }

/* ---------- Moneda ---------- */
function fmtPrice(mxn, opts = {}) {
  if (mxn == null) return "—";
  const rate = (window.CONFIG && window.CONFIG.tipoCambio) || 17;
  if (STATE.currency === "USD") {
    const usd = Math.round(mxn / rate);
    return "$" + usd.toLocaleString("en-US") + " USD";
  }
  return "$" + Math.round(mxn).toLocaleString("es-MX") + (opts.short ? "" : " MXN");
}
function fmtPriceCompact(mxn) {
  if (mxn == null) return "—";
  const rate = (window.CONFIG && window.CONFIG.tipoCambio) || 17;
  const val = STATE.currency === "USD" ? mxn / rate : mxn;
  const sym = STATE.currency === "USD" ? "USD" : "MXN";
  if (val >= 1e6) return "$" + (val / 1e6).toFixed(val % 1e6 === 0 ? 0 : 1).replace(/\.0$/, "") + "M " + sym;
  if (val >= 1e3) return "$" + Math.round(val / 1e3) + "K " + sym;
  return "$" + Math.round(val).toLocaleString() + " " + sym;
}

/* ---------- Aplicar i18n al DOM ---------- */
function applyI18n() {
  document.documentElement.lang = STATE.lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph")));
  });
  document.querySelectorAll(".js-lang").forEach((b) => b.classList.toggle("is-active", b.dataset.lang === STATE.lang));
  document.querySelectorAll(".js-curr").forEach((b) => b.classList.toggle("is-active", b.dataset.curr === STATE.currency));
  document.dispatchEvent(new CustomEvent("i18n:changed"));
}

function setLang(lang) { STATE.lang = lang; localStorage.setItem("brl-lang", lang); applyI18n(); }
function setCurrency(c) { STATE.currency = c; localStorage.setItem("brl-curr", c); applyI18n(); }

/* ---------- Header scroll ---------- */
function initHeader() {
  const header = document.querySelector(".header");
  if (!header) return;
  if (header.dataset.solid !== undefined) {
    // Header sólido permanente (páginas internas): siempre compacto
    header.classList.add("is-scrolled");
  } else {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  document.querySelectorAll(".js-lang").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));
  document.querySelectorAll(".js-curr").forEach((b) => b.addEventListener("click", () => setCurrency(b.dataset.curr)));

  const burger = document.querySelector(".burger");
  const mobile = document.querySelector(".mobile-nav");
  if (burger && mobile) {
    burger.addEventListener("click", () => { mobile.classList.toggle("is-open"); document.body.style.overflow = mobile.classList.contains("is-open") ? "hidden" : ""; });
    mobile.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => { mobile.classList.remove("is-open"); document.body.style.overflow = ""; }));
  }
}

/* ---------- Scroll reveals ---------- */
function initReveals() {
  // Modo sin animación (depuración / snapshots / accesibilidad)
  if (/[?&]noanim/.test(location.search)) { document.documentElement.classList.add("noanim"); if (/[?&]snap/.test(location.search)) document.documentElement.classList.add("snap"); return; }
  if (!("IntersectionObserver" in window)) { document.querySelectorAll(".reveal,.reveal-img").forEach(e=>e.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  const watch = () => document.querySelectorAll(".reveal:not(.in), .reveal-img:not(.in)").forEach((el) => io.observe(el));
  watch();
  document.addEventListener("content:rendered", watch);
}

/* ---------- Contadores animados ---------- */
function initCounters() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target, target = parseFloat(el.dataset.count), dec = el.dataset.dec ? 1 : 0, suf = el.dataset.suffix || "", pre = el.dataset.prefix || "";
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / 1600, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = pre + (eased * target).toFixed(dec) + suf;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll("[data-count]").forEach((el) => io.observe(el));
}

/* ---------- Cursor personalizado ---------- */
function initCursor() {
  if (window.matchMedia("(hover: none)").matches) return;
  const dot = Object.assign(document.createElement("div"), { className: "cursor-dot" });
  const ring = Object.assign(document.createElement("div"), { className: "cursor-ring" });
  document.body.append(dot, ring);
  let rx = 0, ry = 0, mx = 0, my = 0;
  window.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`; });
  const loop = () => { rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; requestAnimationFrame(loop); };
  loop();
  document.addEventListener("mouseover", (e) => { if (e.target.closest("a,button,.card,.zone-card,.signature__item,input,select")) ring.classList.add("is-hover"); });
  document.addEventListener("mouseout", (e) => { if (e.target.closest("a,button,.card,.zone-card,.signature__item,input,select")) ring.classList.remove("is-hover"); });
}

/* ---------- Helpers de dominio ---------- */
function propTitle(p) { return STATE.lang === "en" ? (p.titulo_en || p.titulo) : p.titulo; }
function propDesc(p) { return STATE.lang === "en" ? (p.descripcion_en || p.descripcion) : p.descripcion; }
function propCover(p) { return `assets/img/propiedades/${p.slug}/foto-1.jpg`; }
function propPhotos(p) {
  const n = (window.CONFIG.fotosPorPropiedad && window.CONFIG.fotosPorPropiedad[p.slug]) || 1;
  return Array.from({ length: n }, (_, i) => `assets/img/propiedades/${p.slug}/foto-${i + 1}.jpg`);
}
function propBadges(p) {
  const out = [];
  if (p.signature) out.push({ cls: "badge--gold", key: "badge.exclusiva" });
  if (p.operacion.includes("venta") && p.operacion.includes("renta")) out.push({ cls: "badge--dark", key: "badge.ventaRenta" });
  else if (p.operacion.includes("renta")) out.push({ cls: "badge--dark", key: "badge.renta" });
  else out.push({ cls: "", key: "badge.venta" });
  return out;
}
function waLink(text) {
  const num = (window.CONFIG && window.CONFIG.whatsapp) || "528112345678";
  return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
}
function zoneCount(key) { return window.PROPIEDADES.filter((p) => p.zonaKey === key).length; }

/* ---------- Card de propiedad (markup compartido) ---------- */
function cardHTML(p) {
  const badges = propBadges(p).map((b) => `<span class="badge ${b.cls}" data-i18n="${b.key}">${t(b.key)}</span>`).join("");
  const specs = [];
  if (p.recamaras) specs.push(`<span><b>${p.recamaras}</b> ${STATE.lang==="en"?"bd":"rec"}</span>`);
  if (p.banos) specs.push(`<span><b>${p.banos}</b> ${STATE.lang==="en"?"ba":"baños"}</span>`);
  if (p.m2_construccion) specs.push(`<span><b>${p.m2_construccion}</b> m²</span>`);
  else if (p.m2_terreno) specs.push(`<span><b>${p.m2_terreno}</b> m² ${STATE.lang==="en"?"lot":"terreno"}</span>`);
  const rent = p.precio_renta_mxn ? `<div class="rent">${fmtPrice(p.precio_renta_mxn)}/${STATE.lang==="en"?"mo":"mes"}</div>` : "";
  return `
    <article class="card reveal" data-slug="${p.slug}">
      <a class="card--link" href="propiedad.html?id=${p.slug}" aria-label="${propTitle(p)}"></a>
      <div class="card__media">
        <img src="${propCover(p)}" alt="${propTitle(p)}" loading="lazy">
        <div class="card__badges">${badges}</div>
        <button class="card__fav" aria-label="Favorito" type="button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 21s-7.5-4.6-10-9.3C.4 8.2 2 5 5.2 5c2 0 3.3 1.1 4 2.2C9.8 6.1 11.2 5 13.1 5 16.3 5 18 8.2 16.4 11.7 13.9 16.4 12 21 12 21z"/></svg>
        </button>
        <div class="card__price-on-media">
          <div class="p">${fmtPriceCompact(p.precio_venta_mxn)}</div>
          ${rent}
        </div>
      </div>
      <div class="card__body">
        <span class="card__zone">${p.zona}</span>
        <h3 class="card__title">${propTitle(p)}</h3>
        <div class="card__specs">${specs.join("")}<span style="margin-left:auto;opacity:.6">${p.tipo}</span></div>
      </div>
    </article>`;
}

/* ---------- Init compartido ---------- */
function initShared() { initHeader(); applyI18n(); initReveals(); initCounters(); initCursor(); }
document.addEventListener("DOMContentLoaded", initShared);
