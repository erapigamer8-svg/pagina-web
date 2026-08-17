import { useEffect, useRef, useState } from "react";

/**
 * Un vídeo rebobinado con el cursor.
 *
 * No se reproduce: la posición horizontal del ratón se traduce directamente a un
 * punto de la línea de tiempo. El vídeo debe ir de mirar a la izquierda a mirar a
 * la derecha de forma continua, sin volver al centro por el medio.
 *
 *   ratón a la izquierda  →  segundo 0
 *   ratón en el centro    →  mitad
 *   ratón a la derecha    →  final
 *
 * En móvil no hay cursor, así que se reproduce solo en bucle, ida y vuelta.
 */
export function HeroVideo({ src }: { src: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const objetivo = useRef(0.5);
  const actual = useRef(0.5);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    const v = video.current;
    if (!v) return;

    const tactil = !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducido) {
      const alCargar = () => {
        if (Number.isFinite(v.duration)) v.currentTime = v.duration / 2;
      };
      v.addEventListener("loadedmetadata", alCargar);
      return () => v.removeEventListener("loadedmetadata", alCargar);
    }

    // ---- Móvil: va y viene solo ----
    if (tactil) {
      let raf = 0;
      let t = 0;
      const bucle = () => {
        t += 0.006;
        // Vaivén suave entre 0 y 1
        objetivo.current = (Math.sin(t) + 1) / 2;
        aplicar(v);
        raf = requestAnimationFrame(bucle);
      };
      raf = requestAnimationFrame(bucle);
      return () => cancelAnimationFrame(raf);
    }

    // ---- Escritorio: lo manda el cursor ----
    const mover = (e: MouseEvent) => {
      objetivo.current = Math.max(0, Math.min(1, e.clientX / window.innerWidth));
    };
    window.addEventListener("mousemove", mover, { passive: true });

    let raf = 0;
    const marco = () => {
      aplicar(v);
      raf = requestAnimationFrame(marco);
    };
    raf = requestAnimationFrame(marco);

    return () => {
      window.removeEventListener("mousemove", mover);
      cancelAnimationFrame(raf);
    };
  }, [src]);

  /** Suaviza el seguimiento y solo pide un salto cuando el anterior ya se pintó. */
  const aplicar = (v: HTMLVideoElement) => {
    // Interpolación: sin esto el vídeo persigue al ratón a tirones
    actual.current += (objetivo.current - actual.current) * 0.12;

    if (v.seeking || !Number.isFinite(v.duration) || v.duration === 0) return;

    const destino = actual.current * v.duration;
    if (Math.abs(v.currentTime - destino) > 0.015) {
      v.currentTime = destino;
    }
  };

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ opacity: listo ? 1 : 0, transition: "opacity .5s ease" }}
    >
      <video
        ref={video}
        src={src}
        muted
        playsInline
        preload="auto"
        onLoadedData={(e) => {
          const v = e.currentTarget;
          if (Number.isFinite(v.duration)) v.currentTime = v.duration / 2;
          setListo(true);
        }}
        /**
         * Escritorio: "contain". El vídeo es vertical (1080x1368) y la pantalla
         * apaisada; al forzarlo a llenar se ampliaba casi al doble y se pixelaba.
         * El fondo del hero es del color del vídeo, así que no se ve el borde.
         *
         * Móvil: "cover". Ahí la pantalla también es vertical, así que llenarla
         * REDUCE el vídeo en vez de ampliarlo —sigue nítido— y evita el hueco
         * blanco enorme que dejaba "contain".
         */
        className="absolute inset-0 h-full w-full object-cover md:object-contain"
        aria-hidden="true"
      />
    </div>
  );
}
