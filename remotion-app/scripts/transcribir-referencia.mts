/**
 * Transcribe un vídeo de REFERENCIA (uno ajeno que te gustó) a texto plano.
 *
 * Los agentes no pueden ver vídeos. Esto convierte la referencia en algo que sí pueden leer:
 * el texto de lo que se dice, con el hook al principio.
 *
 * Uso:
 *   npx tsx scripts/transcribir-referencia.mts "C:\ruta\al\video.mp4" "nombre-corto"
 */
import fs from "fs";
import path from "path";
import { transcribe, toCaptions } from "@remotion/install-whisper-cpp";
import { ffmpeg } from "./ffmpeg-bin.mts";
import { WHISPER_DIR, WHISPER_VERSION } from "./whisper-config.mts";

const entrada = process.argv[2];
const nombre = process.argv[3];
const MODELO = (process.argv[4] ?? "small") as "tiny" | "base" | "small" | "medium" | "large-v3";

if (!entrada) {
  console.error('Uso: npx tsx scripts/transcribir-referencia.mts "<video>" "<nombre-corto>"');
  process.exit(1);
}

const rutaVideo = path.resolve(entrada);
if (!fs.existsSync(rutaVideo)) {
  console.error(`No existe el archivo: ${rutaVideo}`);
  process.exit(1);
}

if (!fs.existsSync(WHISPER_DIR)) {
  console.error("Whisper no está instalado. Ejecuta antes:");
  console.error("  npx tsx scripts/instalar-whisper.mts");
  process.exit(1);
}

const slug = (nombre ?? path.basename(rutaVideo, path.extname(rutaVideo)))
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

const carpetaTmp = path.join(process.cwd(), ".tmp");
fs.mkdirSync(carpetaTmp, { recursive: true });
const wav = path.join(carpetaTmp, `ref-${slug}.wav`);

console.log("Extrayendo audio...");
ffmpeg(["-y", "-i", rutaVideo, "-ar", "16000", "-ac", "1", "-c:a", "pcm_s16le", wav]);

console.log(`Transcribiendo (modelo "${MODELO}", español)...`);
const resultado = await transcribe({
  inputPath: wav,
  whisperPath: WHISPER_DIR,
  whisperCppVersion: WHISPER_VERSION,
  model: MODELO,
  language: "es",
  tokenLevelTimestamps: true,
});

const { captions } = toCaptions({ whisperCppOutput: resultado });
fs.rmSync(wav, { force: true });

const texto = captions.map((c) => c.text).join("").trim();

// El hook son los primeros 3 segundos: lo que decide si el vídeo funciona
const hook = captions
  .filter((c) => c.startMs < 3000)
  .map((c) => c.text)
  .join("")
  .trim();

const salidaDir = path.resolve(process.cwd(), "..", "contenido", "referencias");
fs.mkdirSync(salidaDir, { recursive: true });
const salida = path.join(salidaDir, `${slug}.md`);

fs.writeFileSync(
  salida,
  `# Referencia — ${slug}

> Transcrita automáticamente. **Rellena los datos de abajo a mano**: son los que deciden
> si este vídeo funcionó de verdad, y no se pueden sacar del audio.

- **Enlace:**
- **Plataforma:**
- **Visitas:**
- **Seguidores de la cuenta:**
- **Fecha aproximada:**
- **Qué te llamó la atención:**

## Hook (primeros 3 segundos)

> ${hook || "(no se detectó voz en los primeros 3 segundos)"}

## Transcripción completa

${texto || "(no se detectó voz)"}
`,
  "utf-8",
);

console.log(`\nGuardado: ${salida}`);
console.log(`\n--- Hook detectado ---\n${hook || "(nada)"}\n`);
console.log("Abre el archivo y rellena visitas y seguidores. Sin esos dos números,");
console.log("el agente no puede saber si el formato funcionó o si era solo una cuenta grande.");
