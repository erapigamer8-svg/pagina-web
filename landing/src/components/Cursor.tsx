import { useEffect, useRef, useState } from "react";

/** Cursor propio. Solo en escritorio con ratón; en táctil no aparece. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fino = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const ancho = window.innerWidth >= 1024;
    if (!fino || !ancho) return;

    setVisible(true);

    const mover = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", mover, { passive: true });
    document.documentElement.classList.add("sin-cursor");

    return () => {
      window.removeEventListener("mousemove", mover);
      document.documentElement.classList.remove("sin-cursor");
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="exclusion pointer-events-none fixed z-50"
      style={{ transform: "translate(-50%, -50%)", left: -100, top: -100 }}
    >
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="21.5" stroke="#fff" strokeWidth="2.5" />
        <path
          d="M16 24h16M24 16v16"
          stroke="#fff"
          strokeWidth="2.5"
          strokeLinecap="square"
        />
      </svg>
    </div>
  );
}
