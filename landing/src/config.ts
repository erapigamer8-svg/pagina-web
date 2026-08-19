/**
 * Todo lo editable de la landing, en un solo sitio.
 * Cambia aquí y no toques los componentes.
 */

/**
 * Número con prefijo, sin espacios ni signos.
 *
 * México: 52 + los 10 dígitos. Si algún móvil no recibe los mensajes, prueba a
 * añadir un 1 tras el 52 ("5218341264154") — es una particularidad antigua de
 * WhatsApp en México que todavía aparece en algunos dispositivos.
 */
export const WHATSAPP_NUMERO = "528341264154";

/** Mensaje por defecto, cuando entran por el botón rápido sin rellenar nada. */
export const WHATSAPP_MENSAJE =
  "Hola, vi tu web y quiero que mi WhatsApp deje de perder clientes.";

/** Datos del formulario. Todos opcionales: nunca deben impedir el envío. */
export type DatosContacto = {
  nombre?: string;
  negocio?: string;
  situacion?: string;
};

/**
 * Arma el mensaje que ya va escrito al abrir el chat.
 * Si no rellenan nada, cae en el mensaje por defecto.
 */
export function enlaceWhatsApp(datos?: DatosContacto): string {
  if (!WHATSAPP_NUMERO) return "";

  const nombre = datos?.nombre?.trim();
  const negocio = datos?.negocio?.trim();
  const situacion = datos?.situacion?.trim();

  let texto = WHATSAPP_MENSAJE;

  if (nombre || negocio || situacion) {
    const partes: string[] = [];

    if (nombre && negocio) partes.push(`Hola, soy ${nombre}, de ${negocio}.`);
    else if (nombre) partes.push(`Hola, soy ${nombre}.`);
    else if (negocio) partes.push(`Hola, escribo de ${negocio}.`);
    else partes.push("Hola.");

    if (situacion) partes.push(situacion);
    else partes.push("Vi tu web y quiero contarte mi caso.");

    texto = partes.join("\n\n");
  }

  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
}

export const FORMULARIO = {
  titulo: "Cuéntame en tres líneas",
  campos: {
    nombre: { etiqueta: "Tu nombre", ejemplo: "María" },
    negocio: { etiqueta: "Tu negocio", ejemplo: "Clínica Dental Sur" },
    situacion: {
      etiqueta: "Qué se te está escapando",
      ejemplo: "Me escriben por WhatsApp a todas horas y no doy abasto para contestar.",
    },
  },
  /** Cuando ya han escrito algo. */
  aviso: "Te llega a mi WhatsApp con esto ya escrito. No hace falta que lo repitas.",
  /** Cuando está vacío: dejar claro que no es obligatorio. */
  avisoVacio: "No hace falta rellenarlo. Si prefieres, escribe directamente.",
  boton: "Abrir WhatsApp",
};

export const MARCA = "Eraps Project";

/**
 * El vídeo del hero, rebobinado con el cursor.
 *
 * Déjalo vacío y el hero usa la demo de chat animada.
 * Para activarlo: mete el archivo en `public/` y pon aquí "/tu-video.mp4".
 *
 * Cómo tiene que ser:
 *  - UN solo clip de 4-6 s
 *  - La cabeza va de mirar a la IZQUIERDA a mirar a la DERECHA, de forma
 *    continua y sin volver al centro por el medio
 *  - Cámara y fondo completamente quietos
 *  - Sin audio (va en silencio)
 *
 * El ratón manda: a la izquierda del todo es el segundo 0, en el centro la mitad
 * del vídeo, a la derecha del todo el final.
 */
export const VIDEO_HERO = "/hero.mp4";

/**
 * Color de fondo del propio vídeo. El hero se pinta de este color para que el
 * vídeo, que no llena toda la pantalla, se funda con la página sin bordes.
 * Si cambias de vídeo y su fondo es otro, cámbialo aquí.
 */
export const FONDO_VIDEO = "#F9F9F9";

export const HERO = {
  titulo: ["Tu WhatsApp", "contesta solo."],
  subtitulo:
    "Cada mensaje que tarda en responderse es un cliente que se va a la competencia.",
  /**
   * Arriba a la izquierda, bajo el logo.
   *
   * Escrito con seguridad, no como disculpa: la edad se menciona una vez y se pasa
   * enseguida a lo que sabe hacer. Si suena a "perdón por ser joven", resta.
   */
  sobreMi: {
    titulo: "Sobre mí",
    texto:
      "Automatizo la atención al cliente de negocios locales. Según lo que necesites, lo monto sobre Kommo —para poner orden en tus conversaciones— o a medida con n8n. Si tu caso no merece automatizarse, te lo digo antes de cobrarte nada.",
  },

  /** Responde a la objeción "¿tengo que cambiar de herramientas?". */
  caption:
    "No cambias de herramientas ni de número. Sigues con tu WhatsApp de siempre.",

  /**
   * Derecha. Transparencia del proceso: enseñar los pasos exactos baja el riesgo
   * percibido, que es lo que sustituye a los testimonios cuando aún no los hay.
   */
  pasos: {
    titulo: "Cómo funciona",
    items: [
      "Te escribe un cliente",
      "El sistema responde y pregunta lo justo",
      "Reserva la cita en tu agenda",
      "Le recuerda que viene",
      "Tú solo apareces",
    ],
  },

  /** Bajo el titular. Responde a "¿esto sirve para mi negocio?". */
  sello: "Clínicas · Gestorías · Talleres · Inmobiliarias · Centros de estética",

  /** Botón del hero. Sin él, quien se convence arriba no tiene dónde pulsar. */
  cta: "Escríbeme por WhatsApp",
};

export const CIERRE = {
  antetitulo: "Sin compromiso",
  titulo: "Cuéntame qué se te escapa",
  texto:
    "Escríbeme y te digo si tu caso se puede automatizar. Si no merece la pena, te lo digo también.",
  boton: "Hablamos",
};

/**
 * Una prueba de la banda.
 *
 * Todas son material propio: capturas o grabaciones de sistemas que monté yo.
 * Nada de esquemas dibujados — un dibujo explica, pero no demuestra.
 */
export type Prueba = {
  /** Archivo en public/. Un .mp4/.webm se reproduce en bucle; el resto es imagen. */
  medio: string;
  /** Insignia de arriba. Dice QUÉ es, no lo que hace: es lo que sostiene la prueba. */
  etiqueta: string;
  titulo: string;
  detalle: string;
  /**
   * Relleno de las bandas que sobran alrededor de la captura.
   *
   * Va con la IMAGEN, no con el tema de la página: se elige del color de fondo
   * de la propia captura para que el borde no se note. Por eso no se invierte
   * cuando se cambian los colores de la sección.
   */
  fondo: string;
};

export const SECCION_PRUEBAS = {
  antetitulo: "Cómo se ve por dentro",
  titulo: ["Sin cambiar", "de herramientas."],
  texto: "Tu WhatsApp sigue siendo tu WhatsApp. Lo que cambia es lo que pasa por detrás.",
  aviso: "Todo lo que ves es material propio.",
  /** Con ratón la banda se para al pasar por encima; en un táctil se desliza. */
  avisoRaton: "Pasa el ratón para pararla, o pulsa una tarjeta para verla en grande.",
  avisoTactil: "Desliza para verlas todas. Pulsa una para verla en grande.",
};

export const PRUEBAS: Prueba[] = [
  {
    medio: "/prueba-whatsapp.png",
    etiqueta: "conversación real",
    titulo: "Mi propio WhatsApp, a las 00:12",
    detalle:
      "Antes de ofrecérselo a nadie lo probé en mi propio número. Así contestó de madrugada.",
    fondo: "#0b141a",
  },
  {
    medio: "/prueba-n8n.mp4",
    etiqueta: "grabación real",
    titulo: "El flujo por dentro",
    detalle: "n8n ejecutándose: entra el mensaje, decide si es una reserva y responde.",
    fondo: "#0d0d0f",
  },
  {
    medio: "/prueba-kommo.jpg",
    etiqueta: "sistema en producción",
    titulo: "860 conversaciones gestionadas",
    detalle: "Empresa de fumigación. Nombres y mensajes de sus clientes ocultados.",
    fondo: "#ffffff",
  },
  {
    medio: "/prueba-salesbot.jpg",
    etiqueta: "bot en funcionamiento",
    titulo: "El bot por dentro",
    detalle: "Califica al cliente antes de pasártelo. Con sus estadísticas de uso reales.",
    fondo: "#ffffff",
  },
  {
    medio: "/prueba-agente.jpg",
    etiqueta: "montado por mí",
    titulo: "Recepcionista virtual",
    detalle:
      "Diez herramientas: consulta la agenda, reserva, reprograma y escala a una persona cuando toca.",
    fondo: "#0d0d0f",
  },
];
