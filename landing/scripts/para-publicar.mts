/**
 * Convierte dist/index.html en dist/publicar.html.
 *
 * La página publicada aporta su propio <html>/<head>/<body>, así que aquí se deja
 * solo el contenido: título, estilos, el div raíz y el script.
 */
import fs from "fs";
import path from "path";

const dist = path.join(process.cwd(), "dist");
const origen = path.join(dist, "index.html");

if (!fs.existsSync(origen)) {
  console.error("No hay dist/index.html. Ejecuta antes:  npm run build");
  process.exit(1);
}

const html = fs.readFileSync(origen, "utf-8");

const sacar = (etiqueta: string) => {
  const re = new RegExp(`<${etiqueta}[^>]*>[\\s\\S]*?<\\/${etiqueta}>`, "g");
  return html.match(re) ?? [];
};

const titulo = sacar("title")[0] ?? "<title>Eraps Project</title>";
const estilos = sacar("style").join("\n");
const scripts = sacar("script").join("\n");

if (!scripts) {
  console.error("No se encontró el script embebido. ¿Falló el plugin single-file?");
  process.exit(1);
}

let salida = [titulo, estilos, '<div id="root"></div>', scripts].join("\n");

// Los archivos de public/ no existen en la página publicada: hay que meterlos dentro.
// Un vídeo de 2 MB pasa a ~3 MB en base64, y el límite son 16 MB.
const publico = path.join(process.cwd(), "public");
if (fs.existsSync(publico)) {
  for (const archivo of fs.readdirSync(publico)) {
    const ruta = `/${archivo}`;
    if (!salida.includes(ruta)) continue;

    const datos = fs.readFileSync(path.join(publico, archivo));
    const tipo = archivo.endsWith(".mp4")
      ? "video/mp4"
      : archivo.endsWith(".webm")
        ? "video/webm"
        : archivo.endsWith(".png")
          ? "image/png"
          : archivo.endsWith(".webp")
            ? "image/webp"
            : "application/octet-stream";

    const uri = `data:${tipo};base64,${datos.toString("base64")}`;

    // La ruta puede aparecer varias veces en el bundle. Si se sustituye tal cual,
    // se embebe el archivo tantas veces como aparezca. Se guarda una sola copia en
    // una variable global y las apariciones pasan a apuntar a ella.
    const variable = `__asset_${archivo.replace(/[^a-zA-Z0-9]/g, "_")}`;

    // El minificador puede usar comillas dobles, simples o invertidas
    let veces = 0;
    for (const q of ['"', "'", "`"]) {
      const literal = `${q}${ruta}${q}`;
      const n = salida.split(literal).length - 1;
      if (n > 0) {
        veces += n;
        salida = salida.split(literal).join(variable);
      }
    }

    if (veces > 0) {
      salida = `<script>var ${variable}=${JSON.stringify(uri)};</script>\n` + salida;
    } else {
      salida = salida.split(ruta).join(uri);
    }

    console.log(
      `  embebido ${archivo}: ${(datos.length / 1024 / 1024).toFixed(1)} MB ` +
        `→ ${(uri.length / 1024 / 1024).toFixed(1)} MB en base64` +
        (veces > 1 ? ` (aparecía ${veces} veces, guardado 1 vez)` : ""),
    );
  }
}

const totalMB = Buffer.byteLength(salida, "utf-8") / 1024 / 1024;
if (totalMB > 15) {
  console.error(`\n⚠  ${totalMB.toFixed(1)} MB — pasa del límite de 16 MB para publicar.`);
  console.error(`   Comprime más el vídeo o baja su resolución.`);
}

const destino = path.join(dist, "publicar.html");
fs.writeFileSync(destino, salida, "utf-8");

console.log(`Listo: ${destino}  (${totalMB.toFixed(1)} MB)`);
