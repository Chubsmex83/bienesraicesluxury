// Genera /data/propiedades.json desde data.js (fuente única de verdad).
// Uso: node data/build-json.js
const fs = require("fs");
const path = require("path");
const { CONFIG, ZONAS, AGENTES, PROPIEDADES } = require("./data.js");

const out = {
  config: CONFIG,
  zonas: ZONAS,
  agentes: AGENTES,
  propiedades: PROPIEDADES.map((p) => ({
    ...p,
    fotos_dir: `assets/img/propiedades/${p.slug}/`,
    fotos_count: CONFIG.fotosPorPropiedad[p.slug] || 0,
    foto_principal: `assets/img/propiedades/${p.slug}/foto-1.jpg`
  }))
};

fs.writeFileSync(
  path.join(__dirname, "propiedades.json"),
  JSON.stringify(out, null, 2),
  "utf8"
);
console.log(`propiedades.json generado con ${PROPIEDADES.length} propiedades.`);
