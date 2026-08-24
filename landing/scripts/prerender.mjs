/**
 * Mete el HTML ya renderizado dentro de dist/index.html.
 *
 * Sin esto, lo que se publica es una cáscara: `<div id="root"></div>` y 350 KB de
 * JavaScript. Una persona lo ve porque su navegador ejecuta React; un rastreador
 * de IA recibe una página en blanco, porque no ejecuta JavaScript.
 *
 * Corre después de `vite build` y del build de SSR. No necesita navegador: el
 * árbol se renderiza con `react-dom/server` en Node, así que funciona igual en
 * Vercel que en tu portátil.
 *
 * En el navegador, React vuelve a montar encima y todo sigue funcionando igual:
 * el scroll, el vídeo y el cursor no cambian.
 *
 * JS puro y no TypeScript a propósito: así se ejecuta con cualquier Node del
 * servidor de build, sin depender de que sepa borrar tipos.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const raiz = process.cwd();
const destino = join(raiz, "dist", "index.html");
const bundleSsr = join(raiz, "dist-ssr", "entry-server.js");

const fallar = (mensaje) => {
  console.error(`\n  Prerenderizado: ${mensaje}\n`);
  process.exit(1);
};

if (!existsSync(destino)) fallar("no hay dist/index.html. Ejecuta antes `vite build`.");
if (!existsSync(bundleSsr)) fallar("no hay dist-ssr/entry-server.js. Falta el build de SSR.");

const { render } = await import(`file://${bundleSsr.split("\\").join("/")}`);
const marcado = render();

if (!marcado || marcado.length < 500) {
  fallar(`el render devolvió ${marcado.length} caracteres. Algo va mal.`);
}

let html = readFileSync(destino, "utf-8");

// El div raíz tiene que estar vacío: si ya trae contenido, el build está sucio.
const RAIZ_VACIA = /<div id="root">\s*<\/div>/;
if (!RAIZ_VACIA.test(html)) fallar('no se encontró un <div id="root"></div> vacío en dist/index.html.');

html = html.replace(RAIZ_VACIA, () => `<div id="root">${marcado}</div>`);

// La fecha de modificación del schema se sella aquí para que no haya que
// acordarse de tocarla a mano en cada despliegue.
const hoy = new Date().toISOString().slice(0, 10);
html = html.replace(/("dateModified":\s*")\d{4}-\d{2}-\d{2}(")/, `$1${hoy}$2`);

writeFileSync(destino, html, "utf-8");

const kb = (n) => `${Math.round(n / 1024)} KB`;
const palabras = marcado.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;

console.log(
  `\n  Prerenderizado: ${palabras} palabras dentro del HTML ` +
    `(+${kb(marcado.length)}, total ${kb(html.length)}). Fecha sellada: ${hoy}.\n`,
);
