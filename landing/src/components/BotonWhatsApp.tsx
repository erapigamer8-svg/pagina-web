import { enlaceWhatsApp } from "../config";

const Icono = ({ tamano }: { tamano: number }) => (
  <svg width={tamano} height={tamano} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.1-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.11-.22-.17-.47-.29" />
  </svg>
);

/**
 * Botón rápido del hero: abre WhatsApp de un clic, sin pasar por el formulario.
 *
 * Es la vía para quien ya lo tiene decidido. El formulario del final es para
 * quien prefiere contar su caso antes. Dos caminos, a propósito.
 *
 * Es el único elemento con color de toda la página.
 */
export function BotonWhatsApp({ texto }: { texto: string }) {
  const enlace = enlaceWhatsApp();

  if (!enlace) {
    return (
      <span
        className="inline-block rounded-full px-5 py-3 text-[13px] opacity-70"
        style={{ border: "1px dashed currentColor" }}
      >
        Falta tu número de WhatsApp en <code>src/config.ts</code>
      </span>
    );
  }

  return (
    <a
      href={enlace}
      target="_blank"
      rel="noopener noreferrer"
      className="apretado pointer-events-auto inline-flex w-full max-w-[420px] items-center justify-center gap-3 rounded-full px-6 py-4 text-[16px] transition-transform hover:scale-[1.04] md:w-auto md:py-3.5"
      style={{
        background: "var(--senal)",
        color: "#fff",
        boxShadow: "0 6px 24px rgba(0,0,0,.18)",
      }}
    >
      <Icono tamano={20} />
      {texto}
    </a>
  );
}
