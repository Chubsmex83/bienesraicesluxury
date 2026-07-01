# Bienes Raíces Luxury

Sitio web boutique de bienes raíces de lujo para **San Pedro Garza García, Nuevo León**.
Diseño editorial *quiet luxury*, cinematográfico e interactivo, alimentado por **12 propiedades reales**
extraídas de los PDFs en `propiedades/`.

**🌐 En vivo:** https://www.bienesraicesluxury.com.mx
**Asesora:** Fabiola Sada · +52 81 1254 6381 · sada.fabiola@gmail.com

[![Deploy](https://img.shields.io/badge/Vercel-Producci%C3%B3n-000?logo=vercel)](https://www.bienesraicesluxury.com.mx)

---

## ▸ Estado del proyecto

| Item | Estado |
|------|--------|
| Dominio | **www.bienesraicesluxury.com.mx** (SSL) · el dominio sin `www` redirige 308 → www |
| Hosting | Vercel — producción |
| CI/CD | **Deploy automático** en cada `git push` a `main` |
| Repositorio | `Chubsmex83/bienesraicesluxury` |
| Responsive | Verificado sin desbordes (360 / 390 / 414 px) |

---

## ▸ Cómo verlo / editarlo en local

El sitio carga datos e imágenes locales, así que **debe servirse por HTTP** (no abrir `index.html`
directo con `file://`).

```bash
python -m http.server 8099      # o:  npx serve .
```

Abre **http://localhost:8099/index.html**

> Tip: escribe `! python -m http.server 8099` en el prompt para levantarlo aquí mismo.

---

## ▸ Publicar cambios (automático)

El repo de GitHub está conectado a Vercel. Para publicar:

```bash
git add -A
git commit -m "mi cambio"
git push            # Vercel construye y publica solo en www.bienesraicesluxury.com.mx
```

Cada rama / Pull Request genera además una **URL de preview** para revisar antes de producción.
Deploy manual opcional: `vercel --prod`.

---

## ▸ Estructura

```
bienesraices/
├── index.html              ← Home (hero, destacadas, signature, zonas, cartera+mapa, nosotros, contacto)
├── propiedad.html          ← Plantilla de detalle (?id={slug})
├── logo2026.svg            ← Logo / emblema de marca (header, footer, favicon)
├── vercel.json             ← Redirección apex → www (308)
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
- **Responsive**: header móvil con menú hamburguesa (toggles ES/EN·MXN/USD dentro del menú).

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

> Al editar CSS/JS, sube la versión en los `?v=N` de `index.html` / `propiedad.html` para evitar caché del navegador.

---

## ▸ Notas técnicas

- **Sin framework ni build step**: HTML/CSS/JS vanilla. Dependencias por CDN: **Leaflet** (mapas) y Google Fonts.
- Los formularios (contacto y agendar visita) **abren WhatsApp** con el mensaje prearmado.
  Para enviarlos a un backend/email, conecta el `submit` en `index.html` / `assets/js/detail.js`.
- Fotos extraídas de los PDFs (calidad mixta); las cards aplican encuadre uniforme y overlay sutil.
  Se descartaron logos y los mapas de EasyBroker durante la extracción.
- Coordenadas del mapa: centroides aproximados de cada colonia con ligero *jitter*.
- `?noanim` en la URL desactiva las animaciones de entrada (accesibilidad / capturas / SEO).
