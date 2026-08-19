import { useCallback, useEffect, useState } from "react";
import { PRUEBAS, SECCION_PRUEBAS, type Prueba } from "../config";

/**
 * Banda horizontal con las pruebas reales.
 *
 * La pista lleva la lista DUPLICADA y se desplaza hasta -50%: al llegar ahí, la
 * segunda copia está exactamente donde arrancó la primera, así que el salto al
 * reiniciar no se ve. Por eso hay que pintar las dos; con una sola, la banda
 * daría un tirón en cada vuelta.
 *
 * Al pulsar una tarjeta se abre el visor: grande, pero no a pantalla completa.
 */

const esVideo = (ruta: string) => /\.(mp4|webm)$/i.test(ruta);

export function BandaPruebas() {
  const [abierta, setAbierta] = useState<Prueba | null>(null);

  const cerrar = useCallback(() => setAbierta(null), []);

  useEffect(() => {
    if (!abierta) return;
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
    };
    window.addEventListener("keydown", alPulsar);
    return () => window.removeEventListener("keydown", alPulsar);
  }, [abierta, cerrar]);

  return (
    <>
      <div className="mx-auto mb-10 w-full max-w-[1500px] px-4 md:mb-14 md:px-8">
        <span className="etiqueta opacity-50">{SECCION_PRUEBAS.antetitulo}</span>
        <h2 className="apretado mt-4 text-[clamp(34px,6vw,76px)]">
          {SECCION_PRUEBAS.titulo[0]}
          <br />
          {SECCION_PRUEBAS.titulo[1]}
        </h2>
        <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed opacity-65 md:text-[17px]">
          {SECCION_PRUEBAS.texto}
        </p>
      </div>

      <div className="banda">
        {/* Carril aparte: los degradados viven en .banda, que no se desplaza,
            así se quedan clavados cuando en táctil el carril hace scroll. */}
        <div className="banda-carril">
          <div className="pista">
            {[...PRUEBAS, ...PRUEBAS].map((prueba, i) => (
              <Carta
                key={i}
                prueba={prueba}
                /* La segunda copia es decorativa: si fuese pulsable, un lector de
                   pantalla anunciaría cada prueba dos veces. */
                duplicada={i >= PRUEBAS.length}
                alPulsar={() => setAbierta(prueba)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 w-full max-w-[1500px] px-4 text-[13px] opacity-50 md:mt-16 md:px-8">
        {SECCION_PRUEBAS.aviso}{" "}
        <span className="solo-raton">{SECCION_PRUEBAS.avisoRaton}</span>
        <span className="solo-tactil">{SECCION_PRUEBAS.avisoTactil}</span>
      </div>

      {abierta && <Visor prueba={abierta} cerrar={cerrar} />}
    </>
  );
}

function Carta({
  prueba,
  duplicada,
  alPulsar,
}: {
  prueba: Prueba;
  duplicada: boolean;
  alPulsar: () => void;
}) {
  return (
    <button
      type="button"
      className="carta-banda"
      onClick={alPulsar}
      aria-hidden={duplicada || undefined}
      tabIndex={duplicada ? -1 : 0}
    >
      <div className="lienzo-banda" style={{ background: prueba.fondo }}>
        <Medio prueba={prueba} />
        <span className="lupa-banda" aria-hidden="true">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f4f2ee"
            strokeWidth="2.4"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
        </span>
      </div>
      <div className="pie-banda">
        <span className="insignia">{prueba.etiqueta}</span>
        <div className="apretado text-[17px] leading-tight">{prueba.titulo}</div>
        <div className="mt-1.5 text-[12px] leading-snug opacity-[.62]">
          {prueba.detalle}
        </div>
      </div>
    </button>
  );
}

function Medio({ prueba, grande }: { prueba: Prueba; grande?: boolean }) {
  if (esVideo(prueba.medio)) {
    return (
      <video
        src={prueba.medio}
        autoPlay
        loop
        muted
        playsInline
        preload={grande ? "auto" : "metadata"}
      />
    );
  }
  return (
    <img
      src={prueba.medio}
      alt={prueba.titulo}
      loading={grande ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

function Visor({ prueba, cerrar }: { prueba: Prueba; cerrar: () => void }) {
  return (
    <div
      className="visor-banda"
      /* Cerrar solo si el clic cae en el velo, no en la propia imagen. */
      onClick={(e) => {
        if (e.target === e.currentTarget) cerrar();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={prueba.titulo}
    >
      <button type="button" className="cerrar-visor" onClick={cerrar} aria-label="Cerrar">
        ×
      </button>
      <div className="marco-visor">
        <div className="medio-visor" style={{ background: prueba.fondo }}>
          <Medio prueba={prueba} grande />
        </div>
        <div>
          <div className="apretado text-[22px]">{prueba.titulo}</div>
          <div className="mt-1.5 text-[14px] opacity-60">{prueba.detalle}</div>
        </div>
        <div className="etiqueta text-center text-[11px] opacity-45">
          Pulsa fuera o Esc para cerrar
        </div>
      </div>
    </div>
  );
}
