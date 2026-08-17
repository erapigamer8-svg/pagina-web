/**
 * Dónde vive whisper.cpp.
 *
 * IMPORTANTE: NO puede estar dentro del proyecto.
 * @remotion/install-whisper-cpp construye el comando de descompresión SIN comillas, así que
 * cualquier espacio en la ruta lo rompe:
 *
 *   Expand-Archive -Force c:\...\Agencia de videos\...\whisper-bin-x64.zip ...
 *   -> "No se encuentra ningún parámetro de posición que acepte el argumento 'videos\...'"
 *
 * Por eso se instala en el home del usuario, que no tiene espacios.
 * Se puede forzar otra ruta con la variable de entorno WHISPER_DIR.
 */
import os from "os";
import path from "path";

export const WHISPER_VERSION = "1.5.5";

export const WHISPER_DIR = process.env.WHISPER_DIR
  ? path.resolve(process.env.WHISPER_DIR)
  : path.join(os.homedir(), ".whisper-cpp");

if (/\s/.test(WHISPER_DIR)) {
  console.error(
    `La ruta de whisper contiene espacios y la instalación fallará:\n  ${WHISPER_DIR}\n\n` +
      `Elige otra con una ruta sin espacios, por ejemplo:\n` +
      `  set WHISPER_DIR=C:\\whisper-cpp`,
  );
  process.exit(1);
}
