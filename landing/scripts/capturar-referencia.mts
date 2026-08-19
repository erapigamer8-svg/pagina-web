/**
 * Abre una web y toma capturas a distintas alturas del scroll.
 * Sirve para traerme referencias de diseño tal como se ven de verdad.
 *
 * Uso: npx tsx scripts/capturar-referencia.mts <url> <carpeta>
 */
import { chromium } from "playwright-core";
import fs from "fs";
import path from "path";

const DIRECCION = process.argv[2];
const SALIDA = process.argv[3] ?? "referencia";

const EJECUTABLE =
  "C:/Users/erapi/AppData/Local/ms-playwright/chromium_headless_shell-1208/chrome-headless-shell-win64/chrome-headless-shell.exe";

fs.mkdirSync(SALIDA, { recursive: true });

const navegador = await chromium.launch({ executablePath: EJECUTABLE });
const pagina = await navegador.newPage({ viewport: { width: 1440, height: 900 } });

await pagina.goto(DIRECCION, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
await pagina.waitForTimeout(4000);

const alto: any = await pagina.evaluate(`document.documentElement.scrollHeight`);
console.log(`altura de la pagina: ${alto}px`);

const pasos = [0, 0.25, 0.5, 0.75];
for (let i = 0; i < pasos.length; i++) {
  const y = Math.round(alto * pasos[i]);
  await pagina.evaluate(`window.scrollTo(0, ${y})`);
  await pagina.waitForTimeout(2500);
  await pagina.screenshot({ path: path.join(SALIDA, `ref-${i + 1}.png`) });
  console.log(`  captura ${i + 1} (scrollY=${y})`);
}

await navegador.close();
