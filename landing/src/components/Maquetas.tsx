import type { Prueba } from "../config";

/**
 * Esquemas dibujados en CSS/SVG.
 *
 * Son ILUSTRACIONES, no capturas. Están estilizadas a propósito para que se vea
 * que son un esquema: nada aquí pretende pasar por un pantallazo real.
 *
 * Llevan texto concreto (horas raras, nombres, nodos con su nombre de verdad)
 * porque lo abstracto se lee como relleno. Pero la prueba de verdad son las
 * capturas: en cuanto pongas `imagen` en config.ts, sustituyen a esto.
 */

const linea = "rgba(255,255,255,.14)";
const tenue = "rgba(255,255,255,.05)";
const verde = "#1fbf62";

export function Maqueta({ prueba }: { prueba: Prueba }) {
  if (prueba.imagen) {
    return (
      <img
        src={prueba.imagen}
        alt={prueba.titulo}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      {prueba.tipo === "chat" && <Chat />}
      {prueba.tipo === "agenda" && <Agenda />}
      {prueba.tipo === "flujo" && <Flujo />}
      {prueba.tipo === "pipeline" && <Pipeline />}
      {prueba.tipo === "recordatorio" && <Recordatorio />}
    </div>
  );
}

/* ---------- Conversación ---------- */

function Chat() {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="mb-1 text-center text-[9px] tracking-widest uppercase opacity-35">
        jueves · 23:41
      </div>
      <Burbuja texto="Buenas, ¿os queda hueco el jueves?" />
      <Burbuja texto="Sí. Tengo 10:00 y 17:30 👍" propio />
      <Burbuja texto="el de las 10 me viene mejor" />
      <Burbuja texto="Hecho. Te apunto y te aviso el miércoles." propio />
      <div
        className="mt-2 self-center rounded-full px-2.5 py-1 text-[9px] tracking-wider uppercase"
        style={{ border: `1px solid ${verde}66`, color: verde }}
      >
        cita creada
      </div>
    </div>
  );
}

function Burbuja({ texto, propio }: { texto: string; propio?: boolean }) {
  return (
    <div
      className={`max-w-[84%] px-2.5 py-1.5 text-[10.5px] leading-snug ${
        propio ? "self-end" : "self-start"
      }`}
      style={{
        background: propio ? "rgba(255,255,255,.13)" : tenue,
        border: `1px solid ${linea}`,
        borderRadius: 12,
        borderBottomRightRadius: propio ? 3 : 12,
        borderBottomLeftRadius: propio ? 12 : 3,
        color: "rgba(255,255,255,.82)",
      }}
    >
      {texto}
    </div>
  );
}

/* ---------- Agenda ---------- */

function Agenda() {
  const filas: [string, string, boolean][] = [
    ["09:00", "Marta L. · revisión", false],
    ["10:00", "nueva cita", true],
    ["11:30", "Javier R. · primera visita", false],
    ["13:00", "", false],
    ["17:30", "Nuria P.", false],
  ];
  return (
    <div className="w-full">
      <div className="mb-2 text-[9px] tracking-widest uppercase opacity-35">
        jueves 14
      </div>
      <div className="mb-2 h-px w-full" style={{ background: linea }} />
      {filas.map(([hora, quien, nueva]) => (
        <div key={hora} className="mb-1.5 flex items-center gap-2">
          <span className="w-8 text-[9px] tabular-nums opacity-40">{hora}</span>
          <div
            className="flex h-6 flex-1 items-center px-2 text-[9.5px]"
            style={{
              background: nueva ? `${verde}2e` : quien ? tenue : "transparent",
              border: `1px solid ${nueva ? `${verde}88` : quien ? linea : "transparent"}`,
              borderRadius: 4,
              color: nueva ? verde : "rgba(255,255,255,.7)",
            }}
          >
            {quien}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Flujo n8n ---------- */

/**
 * Flujo de n8n. Solo n8n: Kommo es el OTRO camino, no una pieza de este.
 * Cada proyecto va por uno o por otro, nunca los dos juntos.
 */
function Flujo() {
  const nodos: [string, number, number, boolean][] = [
    ["WhatsApp", 2, 58, false],
    ["IA", 62, 58, false],
    ["¿Cita?", 122, 22, false],
    ["Calendar", 122, 94, true],
  ];
  return (
    <svg viewBox="0 0 200 150" className="w-full" fill="none">
      <path
        d="M50 70 H62 M110 70 C 116 70, 116 34, 122 34 M110 70 C 116 70, 116 106, 122 106"
        stroke="rgba(255,255,255,.22)"
        strokeWidth="1.2"
      />
      {nodos.map(([nombre, x, y, destaca]) => (
        <g key={nombre}>
          <rect
            x={x}
            y={y}
            width={48}
            height={24}
            rx={4}
            fill={tenue}
            stroke={destaca ? `${verde}66` : linea}
          />
          <text
            x={x + 24}
            y={y + 15.5}
            textAnchor="middle"
            fontSize="8"
            fill={destaca ? verde : "rgba(255,255,255,.72)"}
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            {nombre}
          </text>
        </g>
      ))}
      <text
        x={100}
        y={144}
        textAnchor="middle"
        fontSize="7"
        letterSpacing="1.4"
        fill="rgba(255,255,255,.3)"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        N8N
      </text>
    </svg>
  );
}

/* ---------- Pipeline Kommo ---------- */

/** Pipeline de Kommo. El otro camino, independiente del de n8n. */
function Pipeline() {
  const columnas: [string, string[]][] = [
    ["Nuevo", ["Marta L.", "Andrés", "Taller SV"]],
    ["Contactado", ["Nuria P.", "Javier R."]],
    ["Presupuesto", ["Clínica Ort.", "Iván", "Rosa M.", "Luis"]],
    ["Cita", ["Marta L."]],
  ];
  return (
    <div className="flex w-full gap-1.5">
      {columnas.map(([nombre, fichas], c) => (
        <div key={nombre} className="flex flex-1 flex-col gap-1">
          <div className="mb-0.5 truncate text-[8px] tracking-wide uppercase opacity-40">
            {nombre}
          </div>
          {fichas.map((f, i) => {
            const cerrado = c === 3;
            return (
              <div
                key={f + i}
                className="truncate px-1.5 py-1 text-[8.5px]"
                style={{
                  background: cerrado ? `${verde}26` : tenue,
                  border: `1px solid ${cerrado ? `${verde}77` : linea}`,
                  borderRadius: 3,
                  color: cerrado ? verde : "rgba(255,255,255,.7)",
                }}
              >
                {f}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ---------- Recordatorio ---------- */

function Recordatorio() {
  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div className="text-[9px] tracking-widest uppercase opacity-35">
        miércoles · 18:00
      </div>
      <div
        className="w-full px-3 py-2.5 text-[10.5px] leading-snug"
        style={{
          background: "rgba(255,255,255,.13)",
          border: `1px solid ${linea}`,
          borderRadius: 12,
          borderBottomRightRadius: 3,
          color: "rgba(255,255,255,.85)",
        }}
      >
        Hola Marta 👋 Te recuerdo tu cita de mañana jueves a las 10:00. Si no puedes,
        contéstame por aquí y la movemos.
      </div>
      <div className="flex w-full justify-end gap-1.5">
        <span
          className="rounded-full px-2 py-1 text-[9px]"
          style={{ border: `1px solid ${linea}`, color: "rgba(255,255,255,.6)" }}
        >
          Cambiar
        </span>
        <span
          className="rounded-full px-2 py-1 text-[9px]"
          style={{ background: `${verde}26`, border: `1px solid ${verde}77`, color: verde }}
        >
          Ahí estaré
        </span>
      </div>
    </div>
  );
}
