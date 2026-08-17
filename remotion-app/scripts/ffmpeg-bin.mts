/**
 * Resuelve el binario de ffmpeg/ffprobe.
 *
 * En esta máquina ffmpeg NO está en el PATH, pero Remotion trae el suyo dentro de
 * node_modules/@remotion/compositor-<plataforma>/. Es un ffmpeg 7.1 completo, así que
 * lo usamos en vez de obligar a instalar nada.
 *
 * Ojo: son binarios enlazados dinámicamente contra las DLL de esa misma carpeta.
 * Hay que invocarlos por ruta absoluta (Windows resuelve las DLL junto al .exe).
 */
import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";

const EXT = process.platform === "win32" ? ".exe" : "";

function buscarEnCompositor(nombre: string): string | null {
  const dirModules = path.join(process.cwd(), "node_modules", "@remotion");
  if (!fs.existsSync(dirModules)) return null;

  for (const entrada of fs.readdirSync(dirModules)) {
    if (!entrada.startsWith("compositor-")) continue;
    const candidato = path.join(dirModules, entrada, `${nombre}${EXT}`);
    if (fs.existsSync(candidato)) return candidato;
  }
  return null;
}

function buscarEnPath(nombre: string): string | null {
  try {
    execFileSync(nombre, ["-version"], { stdio: "ignore" });
    return nombre;
  } catch {
    return null;
  }
}

function resolver(nombre: "ffmpeg" | "ffprobe"): string {
  const bin = buscarEnCompositor(nombre) ?? buscarEnPath(nombre);
  if (!bin) {
    throw new Error(
      `No se encontró ${nombre}. Ni en node_modules/@remotion/compositor-*/ ni en el PATH.\n` +
        `Prueba a reinstalar dependencias:  npm install`,
    );
  }
  return bin;
}

export const ffmpegPath = () => resolver("ffmpeg");
export const ffprobePath = () => resolver("ffprobe");

/** Ejecuta ffmpeg mostrando el error real si falla (no lo resumas: se depura con él). */
export function ffmpeg(args: string[]) {
  return execFileSync(ffmpegPath(), args, {
    stdio: ["ignore", "ignore", "inherit"],
  });
}

/** Ejecuta ffprobe y devuelve stdout como texto. */
export function ffprobe(args: string[]): string {
  return execFileSync(ffprobePath(), args, {
    stdio: ["ignore", "pipe", "pipe"],
    encoding: "utf-8",
  });
}
