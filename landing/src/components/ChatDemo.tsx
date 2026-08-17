import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

type Turno =
  | { de: "cliente" | "sistema"; texto: string; espera: number }
  | { de: "escribiendo"; espera: number }
  | { de: "aviso"; texto: string; espera: number };

// Una conversación real: llega fuera de horario y se resuelve sola.
const GUION: Turno[] = [
  { de: "cliente", texto: "Hola, ¿tenéis hueco para el jueves?", espera: 1400 },
  { de: "escribiendo", espera: 900 },
  {
    de: "sistema",
    texto: "¡Hola! El jueves me queda a las 10:00 y a las 17:30. ¿Cuál te viene mejor?",
    espera: 1800,
  },
  { de: "cliente", texto: "A las 10 mejor", espera: 1200 },
  { de: "escribiendo", espera: 800 },
  {
    de: "sistema",
    texto: "Hecho. Jueves 10:00 👌 Te aviso el día antes para que no se te pase.",
    espera: 1800 },
  { de: "aviso", texto: "Cita creada en Google Calendar", espera: 2600 },
];

const REBOTE = { type: "spring", stiffness: 420, damping: 32, mass: 0.7 } as const;

export function ChatDemo() {
  const [paso, setPaso] = useState(0);

  useEffect(() => {
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducido) {
      setPaso(GUION.length);
      return;
    }
    const t = setTimeout(
      () => setPaso((p) => (p >= GUION.length ? 0 : p + 1)),
      paso === 0 ? 600 : GUION[Math.min(paso - 1, GUION.length - 1)].espera,
    );
    return () => clearTimeout(t);
  }, [paso]);

  const visibles = GUION.slice(0, paso);

  return (
    <div
      className="flex w-full flex-col justify-end gap-2"
      style={{ minHeight: 340 }}
      aria-label="Ejemplo de conversación automatizada"
    >
      <div className="etiqueta mb-3 opacity-45">23:41 · fuera de horario</div>

      <AnimatePresence mode="popLayout">
        {visibles.map((t, i) => {
          if (t.de === "escribiendo") {
            return (
              <motion.div
                key={`e-${i}`}
                layout
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={REBOTE}
                className="self-start rounded-2xl rounded-bl-sm px-4 py-3"
                style={{ background: "rgba(255,255,255,.08)" }}
              >
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((p) => (
                    <motion.span
                      key={p}
                      className="block h-1.5 w-1.5 rounded-full"
                      style={{ background: "var(--tinta)" }}
                      animate={{ opacity: [0.25, 1, 0.25] }}
                      transition={{
                        duration: 1.1,
                        repeat: Infinity,
                        delay: p * 0.16,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            );
          }

          if (t.de === "aviso") {
            return (
              <motion.div
                key={`a-${i}`}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                className="etiqueta mt-3 self-center rounded-full px-4 py-2"
                style={{
                  border: "1px solid rgba(31,191,98,.45)",
                  color: "var(--senal)",
                }}
              >
                ✓ {t.texto}
              </motion.div>
            );
          }

          const propio = t.de === "cliente";
          return (
            <motion.div
              key={`m-${i}`}
              layout
              initial={{ opacity: 0, y: 14, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={REBOTE}
              className={`max-w-[78%] px-4 py-3 text-[15px] leading-snug ${
                propio
                  ? "self-end rounded-2xl rounded-br-sm"
                  : "self-start rounded-2xl rounded-bl-sm"
              }`}
              style={
                propio
                  ? { background: "rgba(255,255,255,.10)" }
                  : { background: "var(--tinta)", color: "#0a0a0b" }
              }
            >
              {t.texto}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
