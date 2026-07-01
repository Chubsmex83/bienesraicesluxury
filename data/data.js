/*
 * Bienes Raíces Luxury — Capa de datos central
 * Fuente única de verdad. Genera /data/propiedades.json con: node data/build-json.js
 * Datos extraídos de los 12 PDFs en /propiedades/.
 */

const CONFIG = {
  marca: "Bienes Raíces Luxury",
  ciudad: "San Pedro Garza García, Nuevo León",
  tipoCambio: 17,            // MXN por USD (configurable)
  whatsapp: "528112546381",  // número WhatsApp (configurable, formato internacional sin +)
  telefono: "+52 81 1254 6381",
  email: "sada.fabiola@gmail.com",
  direccion: "Torre 11, Lázaro Cárdenas 2224, Loma Larga Oriente, C.P. 66266, San Pedro Garza García, N.L.",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Lazaro+Cardenas+2224+Loma+Larga+Oriente+66266+San+Pedro+Garza+Garcia",
  mapsEmbed: "https://maps.google.com/maps?q=Lazaro%20Cardenas%202224%2C%20Loma%20Larga%20Oriente%2C%2066266%20San%20Pedro%20Garza%20Garcia%2C%20Nuevo%20Leon&z=15&output=embed",
  mapCenter: { lat: 25.642, lng: -100.355, zoom: 13 },
  fotosPorPropiedad: {
    "departamento-bakara-santa-maria": 14,
    "casa-olinala-chipinque": 13,
    "casa-oficina-centrito-valle": 14,
    "casa-vista-real-valle-oriente": 14,
    "casa-soles-valle-oriente": 14,
    "departamento-cassea-del-valle": 14,
    "casa-colonial-de-la-sierra": 11,
    "departamento-las-huastecas-valle-poniente": 14,
    "departamento-nube-del-valle": 14,
    "departamento-rio-de-la-plata-centrito": 14,
    "terreno-montecristo": 11,
    "penthouse-west-valle-poniente": 14
  }
};

const ZONAS = [
  { key: "del-valle",        nombre: "Del Valle",                          lat: 25.6505, lng: -100.3585, cover: "departamento-nube-del-valle" },
  { key: "valle-oriente",    nombre: "Valle Oriente",                      lat: 25.6385, lng: -100.3115, cover: "casa-vista-real-valle-oriente" },
  { key: "valle-poniente",   nombre: "Valle Poniente",                     lat: 25.6470, lng: -100.4060, cover: "penthouse-west-valle-poniente" },
  { key: "centrito-valle",   nombre: "Centrito Valle / Fuentes del Valle", lat: 25.6560, lng: -100.3690, cover: "casa-oficina-centrito-valle" },
  { key: "olinala",          nombre: "Chipinque / Olinalá",                lat: 25.6175, lng: -100.3560, cover: "casa-olinala-chipinque" },
  { key: "santa-maria",      nombre: "Santa María",                        lat: 25.6360, lng: -100.3695, cover: "departamento-bakara-santa-maria" },
  { key: "colonial-sierra",  nombre: "Colonial de la Sierra",              lat: 25.6260, lng: -100.3705, cover: "casa-colonial-de-la-sierra" },
  { key: "montecristo",      nombre: "Montecristo",                        lat: 25.6330, lng: -100.3060, cover: "terreno-montecristo" }
];

// Asesora única de la boutique
const AGENTES = {
  mariana: { nombre: "Fabiola Sada", rol: "", rol_en: "", foto: "agente-1" },
  eduardo: { nombre: "Fabiola Sada", rol: "", rol_en: "", foto: "agente-1" },
  sofia:   { nombre: "Fabiola Sada", rol: "", rol_en: "", foto: "agente-1" }
};

const PROPIEDADES = [
  {
    id: "EB-UP6171",
    slug: "departamento-nube-del-valle",
    titulo: "Torre Nube — Arboleda",
    titulo_en: "Nube Tower — Arboleda",
    tipo: "Departamento",
    operacion: ["venta"],
    precio_venta_mxn: 45000000,
    zona: "Del Valle", zonaKey: "del-valle",
    recamaras: 3, banos: 3, medios_banos: 1, estacionamientos: 3,
    m2_construccion: 379, m2_terreno: null, pisos: null, antiguedad: "A estrenar",
    coords: { lat: 25.6498, lng: -100.3575 },
    destacada: true, signature: true, agente: "eduardo",
    descripcion: "Espectacular departamento en la prestigiada zona de Arboleda, dentro de la icónica Torre Nube, reconocida por su diseño vanguardista. 379 m² de elegancia con 3 recámaras —cada una con baño y vestidor—, cuarto de servicio con baño completo, cocina equipada con acabados de lujo y áreas sociales luminosas con ventanales de piso a techo que enmarcan vistas espectaculares a los jardines y la Sierra Madre.",
    descripcion_en: "Spectacular residence in the prestigious Arboleda district, inside the iconic Nube Tower, renowned for its avant-garde design. 379 m² of elegance with 3 en-suite bedrooms with walk-in closets, service quarters, a fully equipped designer kitchen and luminous living areas framed by floor-to-ceiling windows overlooking the gardens and the Sierra Madre.",
    amenidades: ["Alberca", "Casa club", "Cine", "Boliche", "Gimnasio", "Roof garden", "Jardines amplios", "Restaurantes", "Ludoteca", "Salón de usos múltiples", "Seguridad 24 horas", "Elevador", "Estacionamiento techado", "Aire acondicionado", "Mascotas permitidas"]
  },
  {
    id: "EB-UP7033",
    slug: "casa-olinala-chipinque",
    titulo: "Residencia Olinalá — Chipinque",
    titulo_en: "Olinalá Residence — Chipinque",
    tipo: "Casa",
    operacion: ["venta"],
    precio_venta_mxn: 39900000,
    zona: "Chipinque / Olinalá", zonaKey: "olinala",
    recamaras: 4, banos: 5, medios_banos: 2, estacionamientos: 4,
    m2_construccion: 1500, m2_terreno: 1670, pisos: 5, antiguedad: null,
    coords: { lat: 25.6178, lng: -100.3555 },
    destacada: true, signature: true, agente: "eduardo",
    descripcion: "Imponente residencia en Chipinque Olinalá, una de las zonas más prestigiosas y tranquilas de San Pedro. 1,500 m² de construcción sobre un terreno de 1,670 m², con vistas panorámicas incomparables a la Sierra Madre. Cuatro recámaras —cada una con baño y vestidor—, cinco baños completos, cocina equipada amplia y moderna, área de asadores, jardín privado y roof garden. Lujo y naturaleza en perfecta armonía.",
    descripcion_en: "Commanding residence in Chipinque Olinalá, one of San Pedro's most prestigious and serene enclaves. 1,500 m² built on a 1,670 m² lot with unmatched panoramic views of the Sierra Madre. Four en-suite bedrooms with walk-in closets, five full bathrooms, a spacious modern kitchen, grill area, private garden and roof garden. Luxury and nature in perfect harmony.",
    amenidades: ["Roof garden", "Jardín privado", "Parrilla", "Terraza", "Elevador", "Cisterna", "Bodega", "Cuarto de servicio", "Circuito cerrado", "Aire acondicionado", "Calefacción", "Cocina equipada", "Fraccionamiento privado", "Seguridad 24 horas", "Mascotas permitidas", "Estacionamiento techado"]
  },
  {
    id: "EB-UP6134",
    slug: "departamento-cassea-del-valle",
    titulo: "Torre Cassea — Arboleda",
    titulo_en: "Cassea Tower — Arboleda",
    tipo: "Departamento",
    operacion: ["venta"],
    precio_venta_mxn: 36000000,
    zona: "Del Valle", zonaKey: "del-valle",
    recamaras: 3, banos: 3, medios_banos: 1, estacionamientos: 3,
    m2_construccion: 316, m2_terreno: null, pisos: null, antiguedad: "2023",
    coords: { lat: 25.6512, lng: -100.3600 },
    destacada: true, signature: true, agente: "mariana",
    descripcion: "Exclusivo departamento en Arboleda, el desarrollo más icónico de San Pedro, en la Torre Cassea. 316 m² de diseño y confort con 3 recámaras —cada una con baño y vestidor—, cocina equipada con electrodomésticos de alta gama y amplias áreas sociales con terraza de vistas verdes incomparables. Amenidades de primer nivel: alberca, casa club, boliche, cine y jardines extensos.",
    descripcion_en: "Exclusive residence in Arboleda, San Pedro's most iconic development, within Cassea Tower. 316 m² of design and comfort with 3 en-suite bedrooms with walk-in closets, a high-end equipped kitchen and generous living areas opening onto a terrace with incomparable green views. First-class amenities: pool, clubhouse, bowling, cinema and extensive gardens.",
    amenidades: ["Alberca", "Casa club", "Cine", "Boliche", "Gimnasio", "Jardines extensos", "Restaurantes", "Ludoteca", "Salón de usos múltiples", "Terraza", "Elevador", "Estudio", "Fraccionamiento privado", "Portero", "Seguridad 24 horas", "Estacionamiento techado"]
  },
  {
    id: "EB-UP6998",
    slug: "casa-vista-real-valle-oriente",
    titulo: "Casa Vista Real — Valle Oriente",
    titulo_en: "Vista Real House — Valle Oriente",
    tipo: "Casa",
    operacion: ["venta"],
    precio_venta_mxn: 35000000,
    zona: "Valle Oriente", zonaKey: "valle-oriente",
    recamaras: 4, banos: 4, medios_banos: 2, estacionamientos: 2,
    m2_construccion: 446, m2_terreno: 512, pisos: 3, antiguedad: null,
    coords: { lat: 25.6388, lng: -100.3120 },
    destacada: true, signature: true, agente: "sofia",
    descripcion: "Residencia excepcional en Vista Real, una de las zonas más exclusivas de Valle Oriente, donde la arquitectura contemporánea se une con la elegancia. 446 m² de construcción sobre 512 m² de terreno, con espacios amplios y llenos de luz natural. Cuatro recámaras —cada una con baño y vestidor—, cocina equipada con acabados de lujo, jardín privado y alberca, a minutos de los mejores colegios y centros comerciales.",
    descripcion_en: "Exceptional residence in Vista Real, one of Valle Oriente's most exclusive areas, where contemporary architecture meets elegance. 446 m² built on a 512 m² lot, with spacious, light-filled interiors. Four en-suite bedrooms with walk-in closets, a luxury equipped kitchen, private garden and pool, minutes from the finest schools and shopping.",
    amenidades: ["Alberca", "Jardín privado", "Parrilla", "Terraza", "Estudio", "Cuarto de servicio", "Riego por aspersión", "Circuito cerrado", "Aire acondicionado", "Calefacción", "Cocina equipada", "Fraccionamiento privado", "Portero", "Seguridad 24 horas", "Estacionamiento techado"]
  },
  {
    id: "EB-VG6919",
    slug: "casa-colonial-de-la-sierra",
    titulo: "Casa Colonial de la Sierra",
    titulo_en: "Colonial de la Sierra House",
    tipo: "Casa",
    operacion: ["venta"],
    precio_venta_mxn: 25000000,
    zona: "Colonial de la Sierra", zonaKey: "colonial-sierra",
    recamaras: 3, banos: 4, medios_banos: 2, estacionamientos: 3,
    m2_construccion: 540, m2_terreno: 504, pisos: 2, antiguedad: null,
    coords: { lat: 25.6262, lng: -100.3702 },
    destacada: false, signature: false, agente: "eduardo",
    descripcion: "Excelente ubicación en Colonial de la Sierra, justo arriba de Roberto Garza Sada. Una oportunidad única para invertir, remodelar y crear la casa ideal en un entorno residencial privilegiado. Desarrollada en dos niveles con 504 m² de terreno y 540 m² de construcción: 3 recámaras, cuarto de juegos, áreas sociales bien distribuidas, patio, jardín y cochera para 3 autos. Gran plusvalía y enorme potencial de diseño.",
    descripcion_en: "Prime location in Colonial de la Sierra, just above Roberto Garza Sada. A rare opportunity to invest, renovate and create your ideal home in a privileged residential setting. Two levels across a 504 m² lot with 540 m² built: 3 bedrooms, playroom, well-distributed living areas, patio, garden and parking for 3 cars. Strong appreciation and enormous design potential.",
    amenidades: ["Jardín", "Patio", "Terraza", "Balcón", "Parrilla", "Garaje", "Cisterna", "Cuarto de servicio", "Aire acondicionado", "Cocina equipada", "Estacionamiento techado"]
  },
  {
    id: "EB-UP6289",
    slug: "departamento-rio-de-la-plata-centrito",
    titulo: "Río de la Plata — Centrito Valle",
    titulo_en: "Río de la Plata — Centrito Valle",
    tipo: "Departamento",
    operacion: ["venta"],
    precio_venta_mxn: 25000000,
    zona: "Centrito Valle / Fuentes del Valle", zonaKey: "centrito-valle",
    recamaras: 3, banos: 3, medios_banos: 1, estacionamientos: 2,
    m2_construccion: 315, m2_terreno: null, pisos: null, antiguedad: "2022",
    coords: { lat: 25.6545, lng: -100.3672 },
    destacada: true, signature: false, agente: "mariana",
    descripcion: "Entre Calzada del Valle y Centrito Valle, en una de las zonas más codiciadas de San Pedro. Edificio boutique de solo 7 niveles que ofrece privacidad y un entorno de primer nivel. 315 m² con 3 amplias recámaras —cada una con baño y vestidor—, 3.5 baños, cocina moderna y amplias áreas sociales. Sin cuota de mantenimiento: una verdadera oportunidad a pasos de restaurantes, parques y boutiques.",
    descripcion_en: "Between Calzada del Valle and Centrito Valle, in one of San Pedro's most coveted areas. A boutique building of just 7 floors offering privacy and a first-class setting. 315 m² with 3 spacious en-suite bedrooms with walk-in closets, 3.5 bathrooms, a modern kitchen and generous living areas. No maintenance fee — a true opportunity steps from restaurants, parks and boutiques.",
    amenidades: ["Alberca", "Área de asadores", "Salón de usos múltiples", "Terraza", "Balcón", "Patio", "Elevador", "Portero", "Circuito cerrado", "Aire acondicionado", "Cocina equipada", "Fraccionamiento privado", "Seguridad 24 horas", "Estacionamiento techado"]
  },
  {
    id: "EB-VI1974",
    slug: "casa-oficina-centrito-valle",
    titulo: "Casa/Oficina Centrito Valle",
    titulo_en: "House/Office Centrito Valle",
    tipo: "Casa/Oficina",
    operacion: ["venta"],
    precio_venta_mxn: 21500000,
    zona: "Centrito Valle / Fuentes del Valle", zonaKey: "centrito-valle",
    recamaras: 3, banos: 3, medios_banos: 0, estacionamientos: 5,
    m2_construccion: 300, m2_terreno: 380, pisos: null, antiguedad: null,
    coords: { lat: 25.6558, lng: -100.3685 },
    destacada: false, signature: false, agente: "eduardo",
    descripcion: "En el corazón de San Pedro, en Centrito Valle casi esquina con Avenida Gómez Morín: una ubicación inmejorable. 380 m² de terreno y 300 m² de construcción. Actualmente funciona como oficina discreta —ideal para corporativo boutique, despacho jurídico o consultorios— con 6 privados y área común amplia. Como casa habitación ofrece enorme potencial: se puede desarrollar un segundo nivel con vistas libres a la Sierra Madre. Inversión patrimonial en zona AAA.",
    descripcion_en: "In the heart of San Pedro, in Centrito Valle near the corner of Avenida Gómez Morín: an unbeatable location. 380 m² lot and 300 m² built. Currently a discreet office —ideal for a boutique corporate, law firm or consulting suites— with 6 private rooms and a large common area. As a home it offers enormous potential: a second level could be developed with open views to the Sierra Madre. A patrimonial investment in a AAA zone.",
    amenidades: ["Terraza", "Oficina", "6 privados", "Accesibilidad", "Aire acondicionado", "Calefacción", "Estacionamiento techado", "Alto flujo y plusvalía"]
  },
  {
    id: "EB-UR2814",
    slug: "casa-soles-valle-oriente",
    titulo: "Casa Proyecto Soles — Valle Oriente",
    titulo_en: "Soles Project House — Valle Oriente",
    tipo: "Casa",
    operacion: ["venta"],
    precio_venta_mxn: 20000000,
    zona: "Valle Oriente", zonaKey: "valle-oriente",
    recamaras: 3, banos: 3, medios_banos: 2, estacionamientos: 2,
    m2_construccion: 463, m2_terreno: 218, pisos: 3, antiguedad: "2021",
    coords: { lat: 25.6378, lng: -100.3100 },
    destacada: false, signature: false, agente: "sofia",
    descripcion: "Casa de diseño moderno y espacios amplios en una de las zonas más exclusivas de San Pedro. 3 amplias recámaras, 3.5 baños, cocina equipada con acabados de lujo y game room ideal para reuniones. Área social superior con asador, sótano con área social adicional y tres terrazas espectaculares —una con asador, una con pasto sintético y una abierta con hermosas vistas. Gran oportunidad para concluir y personalizar el proyecto a tu estilo.",
    descripcion_en: "Modern-design home with spacious interiors in one of San Pedro's most exclusive areas. 3 large bedrooms, 3.5 bathrooms, a luxury equipped kitchen and a game room ideal for gatherings. Upper social area with grill, a basement with additional living space and three spectacular terraces —one with grill, one with synthetic turf and one open with beautiful views. A great opportunity to finish and personalize the project to your taste.",
    amenidades: ["Game room", "Roof garden", "3 terrazas", "Parrilla", "Jardín", "Patio", "Balcón", "Bodega", "Estudio", "Cuarto de servicio", "Cisterna", "Garaje", "Aire acondicionado", "Cocina equipada", "Mascotas permitidas"]
  },
  {
    id: "EB-UP6085",
    slug: "penthouse-west-valle-poniente",
    titulo: "WEST 1 Penthouse — Valle Poniente",
    titulo_en: "WEST 1 Penthouse — Valle Poniente",
    tipo: "Penthouse",
    operacion: ["venta"],
    precio_venta_mxn: 19900000,
    zona: "Valle Poniente", zonaKey: "valle-poniente",
    recamaras: 3, banos: 3, medios_banos: 1, estacionamientos: 2,
    m2_construccion: 240, m2_terreno: null, pisos: null, antiguedad: "2023",
    coords: { lat: 25.6462, lng: -100.4068 },
    destacada: true, signature: false, agente: "mariana",
    descripcion: "Penthouse en la torre más exclusiva de Valle Poniente: WEST 1 Residencias. 240 m² con distribución impecable y acabados de la más alta calidad. 3 amplias recámaras —cada una con baño completo y vestidor—, family room, cocina totalmente equipada de diseño contemporáneo, y sala-comedor con ventanales de piso a techo que enmarcan espectaculares vistas a las montañas. Amenidades de clase mundial, seguridad 24/7 y acceso controlado.",
    descripcion_en: "Penthouse in Valle Poniente's most exclusive tower: WEST 1 Residences. 240 m² with an impeccable layout and the highest-quality finishes. 3 large en-suite bedrooms with walk-in closets, a family room, a fully equipped contemporary kitchen, and a living-dining area with floor-to-ceiling windows framing spectacular mountain views. World-class amenities, 24/7 security and controlled access.",
    amenidades: ["Alberca", "Gimnasio", "Cancha de pádel", "Ludoteca", "Salón de usos múltiples", "Family room", "Terraza", "Balcón", "Jardín", "Parrilla", "Cuarto de servicio", "Elevador", "Estudio", "Fraccionamiento privado", "Seguridad 24 horas", "Mascotas permitidas"]
  },
  {
    id: "EB-UP6054",
    slug: "departamento-las-huastecas-valle-poniente",
    titulo: "Las Huastecas — Valle Poniente",
    titulo_en: "Las Huastecas — Valle Poniente",
    tipo: "Departamento",
    operacion: ["venta"],
    precio_venta_mxn: 16500000,
    zona: "Valle Poniente", zonaKey: "valle-poniente",
    recamaras: 3, banos: 3, medios_banos: 0, estacionamientos: 2,
    m2_construccion: 230, m2_terreno: null, pisos: null, antiguedad: "2023",
    coords: { lat: 25.6475, lng: -100.4055 },
    destacada: false, signature: false, agente: "sofia",
    descripcion: "Exclusivo departamento de 230 m² en una de las zonas más codiciadas de Valle Poniente, con vistas panorámicas a las majestuosas montañas de Las Huastecas. 3 amplias recámaras, espacios sociales abiertos con sala-comedor que se integra a una terraza con vista directa a la naturaleza, cocina contemporánea de alta gama y 2 cajones de estacionamiento techados. Desarrollo de primer nivel con amenidades exclusivas y seguridad 24/7.",
    descripcion_en: "Exclusive 230 m² residence in one of Valle Poniente's most coveted areas, with panoramic views of the majestic Las Huastecas mountains. 3 large bedrooms, open living spaces with a living-dining area flowing onto a terrace facing nature, a high-end contemporary kitchen and 2 covered parking spaces. A premier development with exclusive amenities and 24/7 security.",
    amenidades: ["Alberca", "Gimnasio", "Ludoteca", "Salón de usos múltiples", "Terraza", "Balcón", "Jardín", "Patio", "Parrilla", "Elevador", "Circuito cerrado", "Aire acondicionado", "Cocina equipada", "Fraccionamiento privado", "Seguridad 24 horas"]
  },
  {
    id: "EB-VH1161",
    slug: "departamento-bakara-santa-maria",
    titulo: "Departamento Bakara — Santa María",
    titulo_en: "Bakara Apartment — Santa María",
    tipo: "Departamento",
    operacion: ["venta", "renta"],
    precio_venta_mxn: 7800000,
    precio_renta_mxn: 33500,
    zona: "Santa María", zonaKey: "santa-maria",
    recamaras: 2, banos: 2, medios_banos: 0, estacionamientos: 2,
    m2_construccion: 120, m2_terreno: null, pisos: null, antiguedad: "2024",
    coords: { lat: 25.6362, lng: -100.3690 },
    destacada: true, signature: false, agente: "mariana",
    descripcion: "Excelente ubicación a 1 minuto de San Pedro, en el distrito Santa María. 120 m² nuevos con 2 recámaras y 2 baños completos; la recámara principal con walk-in closet. Balcón amplio que ilumina el área social con vistas espectaculares, cocina equipada y acabados de lujo. Disponible en venta y renta —la única opción en renta de la colección.",
    descripcion_en: "Prime location one minute from San Pedro, in the Santa María district. 120 m² brand-new with 2 bedrooms and 2 full bathrooms; the primary suite features a walk-in closet. A generous balcony fills the living area with light and spectacular views, plus an equipped kitchen and luxury finishes. Available for sale and rent — the only rental in the collection.",
    amenidades: ["Alberca", "Gimnasio", "Área de juegos infantiles", "Balcón", "Terraza", "Jardín", "Parrilla", "Elevador", "Oficina", "Aire acondicionado", "Calefacción", "Cocina equipada", "Seguridad 24 horas", "Mascotas permitidas", "Estacionamiento techado"]
  },
  {
    id: "EB-US9019",
    slug: "terreno-montecristo",
    titulo: "Terreno Montecristo — Valle Oriente",
    titulo_en: "Montecristo Land — Valle Oriente",
    tipo: "Terreno",
    operacion: ["venta"],
    precio_venta_mxn: 4500000,
    zona: "Montecristo", zonaKey: "montecristo",
    recamaras: 0, banos: 0, medios_banos: 0, estacionamientos: 0,
    m2_construccion: null, m2_terreno: 255, pisos: null, antiguedad: null,
    frente: 8, fondo: 32.77,
    coords: { lat: 25.6330, lng: -100.3060 },
    destacada: false, signature: false, agente: "eduardo",
    descripcion: "Exclusivo terreno de 255 m² en Montecristo, pegado a Valle Oriente, con todo lo necesario para crear un proyecto de gran plusvalía. Ubicación privilegiada rodeada de colegios de prestigio, centros comerciales, parques y espacios culturales. Su configuración es perfecta para desarrollar una casa descendente, aprovechando la topografía para un diseño moderno con vistas increíbles, luz y privacidad. La oportunidad ideal para construir el hogar de tus sueños.",
    descripcion_en: "Exclusive 255 m² lot in Montecristo, adjoining Valle Oriente, with everything needed to build a high-appreciation project. A privileged location surrounded by prestigious schools, shopping centers, parks and cultural venues. Its configuration is perfect for a descending home design that leverages the topography for modern architecture with incredible views, light and privacy. The ideal opportunity to build your dream home.",
    amenidades: ["Frente 8 m", "Fondo 32.77 m", "Topografía descendente", "Zona de alta plusvalía", "Cerca de colegios", "Cerca de centros comerciales"]
  }
];

// Exports (Node) + globales (navegador)
if (typeof module !== "undefined" && module.exports) {
  module.exports = { CONFIG, ZONAS, AGENTES, PROPIEDADES };
}
if (typeof window !== "undefined") {
  window.CONFIG = CONFIG;
  window.ZONAS = ZONAS;
  window.AGENTES = AGENTES;
  window.PROPIEDADES = PROPIEDADES;
}
