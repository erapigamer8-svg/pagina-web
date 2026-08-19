import { useEffect, useRef } from "react";
import { Cursor } from "./components/Cursor";
import { ChatDemo } from "./components/ChatDemo";
import { BandaPruebas } from "./components/BandaPruebas";
import { HeroVideo } from "./components/HeroVideo";
import { BotonWhatsApp } from "./components/BotonWhatsApp";
import { Formulario } from "./components/Formulario";
import { CIERRE, FONDO_VIDEO, HERO, MARCA, VIDEO_HERO } from "./config";

const HAY_VIDEO = Boolean(VIDEO_HERO);

export default function App() {
  const espaciador = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const interior = useRef<HTMLDivElement>(null);
  const velo = useRef<HTMLDivElement>(null);
  const cta = useRef<HTMLDivElement>(null);
  const pie = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;

    const marco = () => {
      const vh = window.innerHeight;
      const scrollY = window.scrollY;

      const alturaInterior = interior.current?.scrollHeight ?? vh;
      // Lo que de verdad se puede desplazar el contenido del panel.
      const desplazable = Math.max(0, alturaInterior - vh);
      /**
       * Permanencia: scroll que el panel aguanta QUIETO antes de que empiece el
       * cierre. La banda se mueve sola y cabe en una pantalla, así que sin esto
       * `desplazable` sale casi cero y el velo del cierre arranca encima de ella.
       */
      const permanencia = vh * 0.9;
      const recorridoPanel = desplazable + permanencia;

      if (espaciador.current) {
        espaciador.current.style.height = `${vh + recorridoPanel + 2 * vh}px`;
      }

      // Fase 1: el panel sube tapando el hero
      const subida = Math.min(1, scrollY / vh);
      const desplazamiento = vh * (1 - subida);
      if (panel.current) {
        panel.current.style.transform = `translate3d(0, ${desplazamiento}px, 0)`;
      }

      // El hero deja de verse una vez tapado (y de consumir pintado)
      if (hero.current) {
        hero.current.style.visibility = scrollY > vh ? "hidden" : "visible";
      }

      // Fase 2: el contenido del panel se desplaza hacia arriba
      const avance = Math.max(0, scrollY - vh);
      if (interior.current) {
        interior.current.style.transform = `translate3d(0, ${-Math.min(avance, desplazable)}px, 0)`;
      }

      // Cierre: velo blanco, formulario y pie
      const inicioCierre = vh + recorridoPanel;
      const p = Math.max(0, Math.min(1, (scrollY - inicioCierre) / (vh * 0.8)));
      if (velo.current) velo.current.style.opacity = String(p);
      if (cta.current) {
        cta.current.style.transform = `scale(${p.toFixed(3)})`;
        cta.current.style.pointerEvents = p > 0.6 ? "auto" : "none";
      }
      if (pie.current) pie.current.style.opacity = String(p);

      raf = requestAnimationFrame(marco);
    };

    raf = requestAnimationFrame(marco);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      id="scroll-spacer"
      ref={espaciador}
      className="relative select-none"
      style={{ height: "500vh" }}
    >
      <Cursor />

      {/* ---------- HERO ---------- */}
      <div
        ref={hero}
        className="fixed inset-0 z-0"
        style={HAY_VIDEO ? { background: FONDO_VIDEO } : undefined}
      >
        {HAY_VIDEO && <HeroVideo src={VIDEO_HERO} />}

        <div className="exclusion entra pointer-events-none absolute top-4 left-4 z-20 md:top-8 md:left-8">
          <div className="apretado text-[22px] md:text-[28px]">{MARCA}</div>
        </div>

        {/* En escritorio va arriba a la derecha (donde iría el menú: los enlaces
            que no llevan a ningún sitio restan confianza).
            En móvil no cabe al lado del logo, así que baja a una barra fija
            abajo — que además es donde el pulgar llega solo. */}
        <div
          className="entra pointer-events-none fixed right-4 bottom-4 left-4 z-40 flex justify-center md:absolute md:top-7 md:right-8 md:bottom-auto md:left-auto md:block"
          style={{ animationDelay: "0.15s" }}
        >
          <BotonWhatsApp texto={HERO.cta} />
        </div>

        {HAY_VIDEO ? (
          /* Con vídeo el texto va sobre la imagen, en modo exclusión: sobre el fondo
             claro se vuelve oscuro y sobre la ropa oscura se vuelve claro.
             OJO: la clase y el z-index van en el MISMO elemento. Si se envuelven en
             un div con z-index, ese div crea un contexto de apilamiento, aísla la
             mezcla y el texto deja de ver el vídeo que tiene detrás. */
          <>
            {/* Bajo el logo, izquierda */}
            <div
              className="entra exclusion pointer-events-none absolute top-20 left-4 z-20 hidden max-w-[34ch] md:top-24 md:left-8 md:block"
              style={{ animationDelay: "0.25s" }}
            >
              <div className="apretado mb-4 text-[clamp(22px,2.2vw,32px)]">
                {HERO.sobreMi.titulo}
              </div>
              <p className="text-[13px] leading-relaxed">{HERO.sobreMi.texto}</p>
              <p className="mt-3 text-[13px] leading-relaxed opacity-70">
                {HERO.caption}
              </p>
            </div>

            {/* Derecha: los pasos exactos. Sin testimonios, la transparencia del
                proceso es lo que baja el riesgo percibido. */}
            <div
              className="entra exclusion pointer-events-none absolute top-20 right-4 z-20 hidden text-right md:top-24 md:right-8 lg:block"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="apretado mb-4 text-[clamp(22px,2.2vw,32px)]">
                {HERO.pasos.titulo}
              </div>
              <ol className="flex flex-col gap-1.5 text-[13px] leading-snug">
                {HERO.pasos.items.map((p, i) => (
                  <li key={p}>
                    <span className="mr-2 opacity-40 tabular-nums">{i + 1}</span>
                    {p}
                  </li>
                ))}
              </ol>
            </div>

            <h1
              className="apretado entra exclusion pointer-events-none absolute bottom-40 left-4 z-20 max-w-[92vw] text-[clamp(32px,8vw,74px)] md:bottom-28 md:left-8 md:max-w-[44vw]"
              style={{ animationDelay: "0.1s" }}
            >
              {HERO.titulo.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h1>

            <div
              className="etiqueta entra exclusion pointer-events-none absolute right-4 bottom-28 left-4 z-20 text-[10px] leading-relaxed opacity-60 md:right-auto md:bottom-16 md:left-8 md:text-[12px]"
              style={{ animationDelay: "0.6s" }}
            >
              {HERO.sello}
            </div>

            <p
              className="apretado entra exclusion pointer-events-none absolute right-4 bottom-16 z-20 hidden max-w-[22ch] text-right text-[clamp(19px,1.9vw,28px)] leading-tight md:right-8 md:block"
              style={{ animationDelay: "0.35s" }}
            >
              {HERO.subtitulo}
            </p>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 px-4 md:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
              <div>
                <h1
                  className="apretado entra text-[clamp(44px,9vw,120px)]"
                  style={{ animationDelay: "0.1s" }}
                >
                  {HERO.titulo.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </h1>

                <p
                  className="entra mt-8 max-w-[52ch] text-[15px] leading-relaxed opacity-70 md:text-[17px]"
                  style={{ animationDelay: "0.3s" }}
                >
                  {HERO.subtitulo}
                </p>
              </div>

              <div className="entra w-full" style={{ animationDelay: "0.45s" }}>
                <ChatDemo />
              </div>
            </div>
          </div>
        )}

        {/* En móvil se oculta: ahí abajo va la barra del botón */}
        <div
          className={`etiqueta exclusion entra pointer-events-none absolute bottom-6 z-20 hidden md:block ${
            HAY_VIDEO ? "left-4 md:left-8" : "left-1/2 -translate-x-1/2"
          }`}
          style={{ animationDelay: "0.9s" }}
        >
          baja para ver cómo queda por dentro
        </div>
      </div>

      {/* ---------- PANEL / GALERÍA ---------- */}
      <div
        ref={panel}
        className="fixed inset-0 z-10 overflow-hidden"
        style={{ background: "#000", transform: "translate3d(0,100vh,0)" }}
      >
        <div
          ref={interior}
          className="w-full"
          /* Menos aire arriba que antes: la sección ya trae su propio titular. */
          style={{ paddingTop: "min(120px, 13vh)" }}
        >
          <BandaPruebas />
          <div style={{ height: "18vh" }} />
        </div>
      </div>

      {/* ---------- CIERRE ---------- */}
      <div
        ref={velo}
        className="pointer-events-none fixed inset-0 z-20"
        style={{ background: "#f4f2ee", opacity: 0 }}
      />

      <div
        ref={cta}
        className="fixed inset-0 z-30 flex flex-col items-center justify-center px-6 text-center"
        style={{ transform: "scale(0)", pointerEvents: "none", color: "#0a0a0b" }}
      >
        <div className="etiqueta opacity-50">{CIERRE.antetitulo}</div>
        <h2 className="apretado mt-5 text-[clamp(36px,7vw,88px)]">{CIERRE.titulo}</h2>
        <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed opacity-70 md:text-[17px]">
          {CIERRE.texto}
        </p>

        <div className="mt-10 flex w-full justify-center">
          <Formulario />
        </div>
      </div>

      <div
        ref={pie}
        className="etiqueta pointer-events-none fixed bottom-6 left-0 z-40 flex w-full justify-between px-4 md:px-8"
        style={{ opacity: 0, color: "#0a0a0b" }}
      >
        <span>{MARCA} · 2026</span>
        <span>Kommo o n8n</span>
      </div>
    </div>
  );
}
