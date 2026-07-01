# Bienes Raíces Luxury

Sitio web boutique de bienes raíces de lujo para **San Pedro Garza García, Nuevo León**.
Diseño editorial *quiet luxury*, cinematográfico e interactivo, alimentado por las **12 propiedades reales**
extraídas de los PDFs en `propiedades/`.

Asesora: **Fabiola Sada** · +52 81 1254 6381 · sada.fabiola@gmail.com

---

## ▸ Cómo verlo en local

El sitio carga datos e imágenes locales, así que **debe servirse por HTTP** (no abrir el `index.html`
directo con `file://`).

Desde la carpeta del proyecto:

```bash
python -m http.server 8099      # o:  npx serve .
```

Abre **http://localhost:8099/index.html**

> Tip: puedes escribir `! python -m http.server 8099` en el prompt para levantarlo aquí mismo.

---

## ▸ Estructura

```
bienesraices/
├── index.html              ← Home (hero, destacadas, signature, zonas, cartera+mapa, nosotros, contacto)
├── propiedad.html          ← Plantilla de detalle (?id={slug})
├── logo2026.svg            ← Logo / emblema de marca (header, footer, favicon)
├── data/
│   ├── data.js             ← FUENTE ÚNICA: propiedades, zonas, asesora, CONFIG
│   ├── propiedades.json    ← JSON central (generado desde data.js)
│   └── build-json.js       ← Regenera el JSON:  node data/build-json.js
├── assets/
│   ├── css/styles.css      ← Sistema de diseño completo
│   ├── js/
│   │   ├── ui.js           ← i18n (ES/EN), moneda (MXN/USD), header, cursor, reveals, card compartida
│   │   ├── home.js         ← Render de secciones + cartera + mapa Leaflet
│   │   └── detail.js       ← Página de detalle + galería/lightbox + mapa
│   └── img/propiedades/{slug}/foto-1.jpg …   ← 161 fotos extraídas de los PDFs
└── propiedades/            ← PDFs originales (fuente)
```

---

## ▸ Las 12 propiedades

| # | Propiedad | Zona | Tipo | Precio | Signature |
|---|-----------|------|------|--------|:---:|
| 1 | Torre Nube — Arboleda | Del Valle | Departamento | $45.0M | ★ |
| 2 | Residencia Olinalá — Chipinque | Chipinque / Olinalá | Casa | $39.9M | ★ |
| 3 | Torre Cassea — Arboleda | Del Valle | Departamento | $36.0M | ★ |
| 4 | Casa Vista Real — Valle Oriente | Valle Oriente | Casa | $35.0M | ★ |
| 5 | Casa Colonial de la Sierra | Colonial de la Sierra | Casa | $25.0M | |
| 6 | Río de la Plata — Centrito Valle | Centrito Valle | Departamento | $25.0M | |
| 7 | Casa/Oficina Centrito Valle | Centrito Valle | Casa/Oficina | $21.5M | |
| 8 | Casa Proyecto Soles | Valle Oriente | Casa | $20.0M | |
| 9 | WEST 1 Penthouse | Valle Poniente | Penthouse | $19.9M | |
| 10 | Las Huastecas | Valle Poniente | Departamento | $16.5M | |
| 11 | Departamento Bakara | Santa María | Departamento | $7.8M · **renta $33,500** | |
| 12 | Terreno Montecristo | Montecristo | Terreno | $4.5M | |

> **Bakara** es la única propiedad disponible también en **renta** (badge "Venta / Renta").

---

## ▸ Funcionalidad

- **Hero** full-screen con slideshow cinematográfico, logo/emblema centrado y menú debajo.
- **Cartera**: las 12 propiedades en cuadrícula editorial + **mapa interactivo** (Leaflet + OpenStreetMap/CARTO)
  con pines de precio siempre visible. Al hacer clic en una **zona** se filtra la cuadrícula (con chip para limpiar).
- **Colección Signature**, **Explora por Zonas** (con conteo real), **Propiedades Destacadas**.
- **Página de detalle** reutilizable: galería + lightbox, specs, amenidades, mapa, asesora y botón **WhatsApp**.
- **Bilingüe ES/EN** y **moneda MXN/USD** (persistidos en `localStorage`).
- **Contacto** con formulario (Comprar/Vender/Rentar/Invertir), datos de la oficina y **Google Maps embebido**.
- Micro-interacciones, animaciones scroll-triggered, cursor personalizado, WhatsApp flotante.

---

## ▸ Configuración rápida (`data/data.js → CONFIG`)

| Campo | Para qué |
|-------|----------|
| `tipoCambio` | Tipo de cambio MXN→USD (default `17`). |
| `whatsapp` | Número WhatsApp internacional sin `+` (`528112546381`). |
| `telefono`, `email` | `+52 81 1254 6381` · `sada.fabiola@gmail.com`. |
| `direccion` / `mapsUrl` / `mapsEmbed` | Oficina (Torre 11, Lázaro Cárdenas 2224, Loma Larga Oriente) y Google Maps. |
| `mapCenter` | Centro/zoom inicial del mapa de cartera. |

Después de editar propiedades o datos en `data.js`, regenera el JSON:

```bash
node data/build-json.js
```

> Nota: al editar CSS/JS suben la versión en los `?v=N` de `index.html` / `propiedad.html`
> para evitar caché del navegador.

---

## ▸ Notas técnicas

- **Sin framework ni build step**: HTML/CSS/JS vanilla. Dependencias por CDN: **Leaflet** (mapas) y Google Fonts.
- Los formularios (contacto y agendar visita) **abren WhatsApp** con el mensaje prearmado.
  Para enviarlos a un backend/email, conecta el `submit` en `index.html` / `assets/js/detail.js`.
- Fotos extraídas de los PDFs (calidad mixta); las cards aplican encuadre uniforme y overlay sutil.
  Se descartaron logos y los mapas de EasyBroker durante la extracción.
- Coordenadas del mapa: centroides aproximados de cada colonia con ligero *jitter*.
- `?noanim` en la URL desactiva las animaciones de entrada (accesibilidad / capturas / SEO).

---

## ▸ Deploy en Vercel

Es un sitio **estático** (sin build), Vercel lo sirve tal cual desde la raíz.

**Con la CLI:**
```bash
vercel            # preview
vercel --prod     # producción
```

**Desde GitHub (recomendado):** importa el repositorio en https://vercel.com/new y cada `git push`
generará un deploy automático. Framework preset: **Other** · Build command: *(ninguno)* · Output dir: `./`.
