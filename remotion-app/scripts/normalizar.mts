/**
 * Normaliza una grabación a frame rate constante.
 *
 * Los móviles graban con frame rate VARIABLE. Remotion falla al renderizarlos con
 * "No frame found at position ...". Este paso lo arregla y hay que pasarlo SIEMPRE
 * antes de editar.
 */
import fs from "fs";
import path from "path";
import { ffmpeg } from "./ffmpeg-bin.mts";

const entrada = process.argv[2];
const FPS = process.argv[3] ?? "30";

if (!entrada) {
  console.error("Uso: npx tsx scripts/normalizar.mts <ruta-al-video> [fps]");
  process.exit(1);
}

const rutaOriginal = path.resolve(entrada);
if (!fs.existsSync(rutaOriginal)) {
  console.error(`No existe el archivo: ${rutaOriginal}`);
  process.exit(1);
}

const dir = path.join(process.cwd(), "public", "grabaciones");
fs.mkdirSync(dir, { recursive: true });

const slug = path.basename(rutaOriginal, path.extname(rutaOriginal));
const salida = path.join(dir, `${slug}-norm.mp4`);

if (path.resolve(salida) === rutaOriginal) {
  console.error("El origen y el destino son el mismo archivo. Renombra el original.");
  process.exit(1);
}

console.log(`Normalizando a ${FPS} fps constantes...`);

// -fps_mode cfr : frame rate constante (en FFmpeg <7 era -vsync cfr)
// -g / -keyint_min / -sc_threshold 0 : keyframes regulares, imprescindible para que
//    el compositor de Remotion pueda buscar cualquier posición
ffmpeg([
  "-y",
  "-i", rutaOriginal,
  "-c:v", "libx264", "-preset", "fast", "-crf", "20", "-pix_fmt", "yuv420p",
  "-fps_mode", "cfr", "-r", FPS,
  "-g", FPS, "-keyint_min", FPS, "-sc_threshold", "0",
  "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart",
  salida,
]);

const mb = (fs.statSync(salida).size / 1024 / 1024).toFixed(1);
console.log(`\nListo: ${salida} (${mb} MB)`);
console.log(`\nSiguiente paso:`);
console.log(`  npx tsx scripts/transcribir.mts "${salida}"`);
