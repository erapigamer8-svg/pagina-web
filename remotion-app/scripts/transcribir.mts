import { transcribe, toCaptions } from "@remotion/install-whisper-cpp";
import fs from "fs";
import path from "path";
import { ffmpeg } from "./ffmpeg-bin.mts";
import { WHISPER_DIR, WHISPER_VERSION } from "./whisper-config.mts";

const entrada = process.argv[2];
const MODELO = (process.argv[3] ?? "small") as "tiny" | "base" | "small" | "medium" | "large-v3";

if (!entrada) {
  console.error("Uso: npx tsx scripts/transcribir.mts <ruta-al-video> [modelo]");
  process.exit(1);
}

const rutaVideo = path.resolve(entrada);
if (!fs.existsSync(rutaVideo)) {
  console.error(`No existe el archivo: ${rutaVideo}`);
  process.exit(1);
}

const whisperPath = WHISPER_DIR;
if (!fs.existsSync(whisperPath)) {
  console.error("Whisper no está instalado. Ejecuta antes:");
  console.error("  npx tsx scripts/instalar-whisper.mts");
  process.exit(1);
}

const slug = path.basename(rutaVideo, path.extname(rutaVideo));
const carpetaTmp = path.join(process.cwd(), ".tmp");
fs.mkdirSync(carpetaTmp, { recursive: true });

// whisper.cpp exige WAV 16kHz mono
const wav = path.join(carpetaTmp, `${slug}.wav`);
console.log("Extrayendo audio a 16kHz mono...");
ffmpeg(["-y", "-i", rutaVideo, "-ar", "16000", "-ac", "1", "-c:a", "pcm_s16le", wav]);

console.log(`Transcribiendo con el modelo "${MODELO}" (español)...`);
const resultado = await transcribe({
  inputPath: wav,
  whisperPath,
  whisperCppVersion: WHISPER_VERSION,
  model: MODELO,
  language: "es",
  tokenLevelTimestamps: true,
});

const { captions } = toCaptions({ whisperCppOutput: resultado });

const salidaDir = path.join(process.cwd(), "public", "subtitulos");
fs.mkdirSync(salidaDir, { recursive: true });
const salida = path.join(salidaDir, `${slug}.json`);
fs.writeFileSync(salida, JSON.stringify(captions, null, 2), "utf-8");

fs.rmSync(wav, { force: true });

const texto = captions.map((c) => c.text).join("").trim();
console.log(`\nGuardado: ${salida}`);
console.log(`Palabras: ${captions.length}`);
console.log(`\n--- Transcripción ---\n${texto}\n`);
console.log("Revisa nombres propios (Kommo, n8n) y corrígelos en el JSON si hace falta.");
