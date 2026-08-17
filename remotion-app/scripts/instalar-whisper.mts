import { downloadWhisperModel, installWhisperCpp } from "@remotion/install-whisper-cpp";
import fs from "fs";
import path from "path";
import { WHISPER_DIR, WHISPER_VERSION } from "./whisper-config.mts";

// Modelo por defecto: "small" (~500 MB). Buen equilibrio en español.
// "medium" (~1,5 GB) transcribe mejor, pero comprueba el espacio libre en C: antes.
const MODELO = (process.argv[2] ?? "small") as "tiny" | "base" | "small" | "medium" | "large-v3";

console.log(`Instalando whisper.cpp en ${WHISPER_DIR}`);

// El .zip intermedio se descarga en el CWD, no en `to`. Si el CWD tiene espacios
// (este proyecto los tiene), el Expand-Archive sin comillas de la librería falla.
// Por eso nos movemos a la carpeta PADRE de WHISPER_DIR, que no tiene espacios.
// Ojo: la carpeta destino NO debe existir de antemano — la librería aborta si existe
// sin el ejecutable dentro.
const padre = path.dirname(WHISPER_DIR);

if (fs.existsSync(WHISPER_DIR) && !fs.existsSync(path.join(WHISPER_DIR, "main.exe"))) {
  console.log("Encontrada una instalación incompleta. Borrándola...");
  fs.rmSync(WHISPER_DIR, { recursive: true, force: true });
}

process.chdir(padre);

await installWhisperCpp({ to: WHISPER_DIR, version: WHISPER_VERSION });

console.log(`Descargando modelo "${MODELO}" (puede tardar varios minutos)...`);
await downloadWhisperModel({ folder: WHISPER_DIR, model: MODELO });

console.log(`\nListo. Ahora puedes transcribir:`);
console.log(`  npx tsx scripts/transcribir.mts public/grabaciones/tu-video-norm.mp4`);
