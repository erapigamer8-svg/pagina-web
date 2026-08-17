/**
 * Revisa la landing en un navegador real: errores de consola, estilos calculados
 * y capturas en los tres momentos del scroll.
 *
 * Uso:  npx tsx scripts/revisar.mts [url] [carpetaSalida]
 */
import { chromium } from "playwright-core";
import fs from "fs";
import path from "path";

const DIRECCION = process.argv[2] ?? "http://localhost:4173/";
const SALIDA = process.argv[3] ?? path.join(process.cwd(), "capturas");

const EJECUTABLE =
  "C:\\Users\\erapi\\AppData\\Local\\ms-playwright\\chromium_headless_shell-1208\\chrome-headless-shell-win64\\chrome-headless-shell.exe";

fs.mkdirSync(SALIDA, { recursive: true });

const navegador = await chromium.launch({ executablePath: EJECUTABLE });
const pagina = await navegador.newPage({ viewport: { width: 1440, height: 900 } });

const errores: string[] = [];
pagina.on("console", (m) => {
  if (m.type() === "error") errores.push(m.text());
});
pagina.on("pageerror", (e) => errores.push(`PAGEERROR: ${e.message}`));

await pagina.goto(DIRECCION, { waitUntil: "networkidle" });
await pagina.waitForTimeout(1800);

// Se pasa como texto: tsx transforma las funciones e inyecta helpers que no
// existen dentro del navegador ("__name is not defined").
const diagnostico: any = await pagina.evaluate(`(() => {
  var leer = function (sel) {
    var el = document.querySelector(sel);
    if (!el) return { existe: false };
    var c = getComputedStyle(el);
    var r = el.getBoundingClientRect();
    return {
      existe: true,
      opacity: c.opacity,
      color: c.color,
      visibility: c.visibility,
      display: c.display,
      rect: { top: Math.round(r.top), left: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height) }
    };
  };
  return {
    viewport: { w: innerWidth, h: innerHeight },
    alturaPagina: document.documentElement.scrollHeight,
    h1: leer("h1"),
    panel: leer(".z-10"),
    body: {
      color: getComputedStyle(document.body).color,
      bg: getComputedStyle(document.body).backgroundColor
    },
    tarjetas: document.querySelectorAll(".bp-card").length
  };
})()`);

console.log("VIEWPORT:", diagnostico.viewport, "· altura página:", diagnostico.alturaPagina);
console.log("BODY:", diagnostico.body);
console.log("H1:", JSON.stringify(diagnostico.h1));
console.log("PANEL:", JSON.stringify(diagnostico.panel));
console.log("TARJETAS:", diagnostico.tarjetas);
console.log("ERRORES:", errores.length ? errores : "ninguno");

// ---- Hero: comprobar que el vídeo responde al cursor ----
const hayVideo: any = await pagina.evaluate(`(function(){
  var v = document.querySelector("video");
  if (!v) return { existe: false };
  return { existe: true, duracion: v.duration, tiempo: v.currentTime };
})()`);

if (hayVideo.existe) {
  const ancho = diagnostico.viewport.w;
  const posiciones: [string, number][] = [
    ["hero-izquierda", Math.round(ancho * 0.06)],
    ["hero-centro", Math.round(ancho * 0.5)],
    ["hero-derecha", Math.round(ancho * 0.94)],
  ];
  console.log(`VÍDEO: duración ${hayVideo.duracion?.toFixed(2)}s`);
  for (const [nombre, x] of posiciones) {
    await pagina.mouse.move(x, 450);
    await pagina.waitForTimeout(1200);
    const t: any = await pagina.evaluate(`document.querySelector("video").currentTime`);
    console.log(`  ratón x=${x} → currentTime=${Number(t).toFixed(2)}s`);
    await pagina.screenshot({ path: path.join(SALIDA, `${nombre}.png`) });
  }
}

const vh = diagnostico.viewport.h;
const momentos: [string, number][] = [
  ["1-hero", 0],
  ["2-galeria", Math.round(vh * 1.6)],
  ["3-galeria-media", Math.round(vh * 3)],
  ["4-cierre", diagnostico.alturaPagina - vh - 10],
];

for (const [nombre, y] of momentos) {
  await pagina.evaluate(`window.scrollTo(0, ${y})`);
  await pagina.waitForTimeout(700);
  await pagina.screenshot({ path: path.join(SALIDA, `${nombre}.png`) });
  console.log(`captura ${nombre} (scrollY=${y})`);
}

// ---- Formulario: comprobar que el enlace de WhatsApp se arma con los datos ----
await pagina.evaluate(`window.scrollTo(0, document.documentElement.scrollHeight)`);
await pagina.waitForTimeout(1200);

const hayFormulario = await pagina.locator("#nombre").count();
if (hayFormulario > 0) {
  // Vacío: no debe existir enlace a WhatsApp en el formulario
  const enlacesVacio: any = await pagina.evaluate(
    `document.querySelectorAll('a[href^="https://wa.me/"]').length`,
  );
  console.log(`\nFORMULARIO vacío → enlaces a WhatsApp en la página: ${enlacesVacio}`);
  const aviso: any = await pagina.evaluate(
    `(function(){
      var p = Array.from(document.querySelectorAll("p")).filter(function(e){
        return e.textContent && e.textContent.indexOf("Falta") === 0;
      });
      return p.length ? p[0].textContent : null;
    })()`,
  );
  console.log(`  aviso: ${aviso ?? "(ninguno)"}`);
  await pagina.screenshot({ path: path.join(SALIDA, "5-form-vacio.png") });

  await pagina.fill("#nombre", "María");
  await pagina.fill("#negocio", "Clínica Dental Sur");
  await pagina.fill("#situacion", "Me escriben a todas horas y no doy abasto.");
  await pagina.waitForTimeout(500);

  // El del formulario es el último: el primero es el botón rápido del hero
  const href: any = await pagina.evaluate(
    `(function(){
      var todos = document.querySelectorAll('a[href^="https://wa.me/"]');
      return todos.length ? todos[todos.length - 1].getAttribute("href") : null;
    })()`,
  );

  console.log("\nFORMULARIO:");
  if (href) {
    const url = new URL(href);
    console.log(`  número: ${url.pathname.replace("/", "")}`);
    console.log(`  mensaje:\n---\n${url.searchParams.get("text")}\n---`);
  } else {
    console.log("  ⚠ no se encontró el enlace de WhatsApp");
  }
  await pagina.screenshot({ path: path.join(SALIDA, "5-formulario.png") });
} else {
  console.log("\nFORMULARIO: no encontrado");
}

// ---- Móvil ----
const movil = await navegador.newPage({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
  deviceScaleFactor: 2,
});
await movil.goto(DIRECCION, { waitUntil: "networkidle" });
await movil.waitForTimeout(1800);

const altoMovil: any = await movil.evaluate(`document.documentElement.scrollHeight`);
const vhMovil = 844;
const momentosMovil: [string, number][] = [
  ["m1-hero", 0],
  ["m2-galeria", Math.round(vhMovil * 1.8)],
  ["m3-galeria", Math.round(vhMovil * 3.2)],
  ["m4-cierre", altoMovil - vhMovil - 10],
];

console.log("\nMÓVIL (390x844):");
for (const [nombre, y] of momentosMovil) {
  await movil.evaluate(`window.scrollTo(0, ${y})`);
  await movil.waitForTimeout(700);
  await movil.screenshot({ path: path.join(SALIDA, `${nombre}.png`) });
  console.log(`  captura ${nombre}`);
}

// ¿Algo se sale por los lados?
const desborde: any = await movil.evaluate(
  `document.documentElement.scrollWidth > window.innerWidth
     ? document.documentElement.scrollWidth + " > " + window.innerWidth
     : "no"`,
);
console.log(`  desbordamiento horizontal: ${desborde}`);

await navegador.close();
