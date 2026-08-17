# Flujo de trabajo — Eraps Project

Cómo se pasan el trabajo los agentes y dónde va cada cosa.

## Lo primero: cómo se "hablan" los agentes

Cada agente de Pixel Agents es una sesión de terminal **independiente**. No pueden mandarse
mensajes entre ellos — ese canal no existe.

Se coordinan de dos formas:

1. **Archivos**: uno escribe en una carpeta, el siguiente lee de ahí.
2. **`contenido/estado.md`**: el tablero compartido. Cada agente lo lee al empezar y actualiza
   su fila al terminar. Ahí ves de un vistazo en qué etapa está cada vídeo.

No hace falta que los tengas abiertos a la vez. Puedes usar uno hoy y otro mañana: el trabajo
queda en disco.

## Cómo evitan repetir trabajo

Cada vídeo tiene un **ID de 4 dígitos que no cambia nunca** (`0001`, `0002`…), asignado por
`/ideas-contenido` cogiendo el más alto del tablero y sumando 1.

**El tablero es la única fuente de verdad, no los archivos.** Un archivo de ideas puede tener 12
propuestas y solo 3 haber avanzado — eso solo lo sabe la tabla.

Cada agente aplica dos comprobaciones:

- **Antes de crear:** lee todas las filas, incluidas `descartado` y `publicado`. Si ya existe algo
  igual, no lo duplica; lo dice.
- **Antes de trabajar un ID:** mira su etapa. Si ya pasó la suya, no rehace nada y te pregunta.
  Si aún no llegó, avisa de que falta un paso previo.

Así, `/copywriter` solo escribe guiones de filas en etapa `idea`. Una fila en `guion` ya tiene el
suyo, y no se escribe otro salvo que tú lo pidas. Lo mismo para el resto.

---

## Lo que pones tú

| Qué | Dónde | Notas |
|---|---|---|
| **Referencias** | `contenido/referencias/` | Copia `_PLANTILLA.md` y rellénala. **No descargues los vídeos**: hacen falta los datos y el hook, no el archivo |
| **Tus grabaciones** | `remotion-app/public/grabaciones/` | Tiene que ser dentro de `public/` o Remotion no las encuentra |
| **Tus capturas** | `remotion-app/public/capturas/` | Las imágenes que salen sobreimpresas en el vídeo |

---

## La cadena completa

```
   TÚ                    contenido/referencias/
                                  │
                                  ▼
   1. /ideas-contenido    lee referencias + estado.md
                          escribe → contenido/ideas/ideas-AAAA-MM-DD.md
                                  │
                                  ▼
   2. /copywriter         lee la idea elegida
                          escribe → contenido/guiones/NNNN-slug.md
                                  │
                                  ├──────────────┐
                                  ▼              ▼
   3. /trial-reels        lee el guion     4. /lead-magnet   lee el guion
                          escribe →                          escribe →
                          contenido/variantes/               lead-magnets/
                          NNNN-slug-variantes.md             slug.html
                                  │
                                  ▼
   TÚ                     GRABAS el vídeo leyendo el guion
                          lo dejas en remotion-app/public/grabaciones/
                                  │
                                  ▼
   5. /editor-video       lee grabación + guion + capturas
                          normaliza → transcribe → renderiza
                          escribe → salida/NNNN-slug.mp4
                                  │
                                  ▼
   TÚ                     SUBES el vídeo y apuntas resultados
                          en contenido/estado.md
```

---

## Agente por agente

### 1. `/ideas-contenido`
- **Lee:** `contenido/referencias/`, `CLAUDENEGOCIO.md`, `contenido/estado.md`
- **Escribe:** `contenido/ideas/ideas-AAAA-MM-DD.md`
- **Deja en el tablero:** una fila por idea, etapa `idea`
- **Necesita de ti:** referencias con **visitas** y **seguidores de la cuenta**

### 2. `/copywriter`
- **Lee:** la idea, `CLAUDENEGOCIO.md`, referencias de marketing
- **Escribe:** `contenido/guiones/NNNN-slug.md`
- **Deja en el tablero:** etapa `guion`
- **Te pregunta:** la audiencia (`persona` / `empresa` / `venta`) si no está definida

El guion incluye marcas **`[CAPTURA: descripción]`**. Son el enganche con el editor: gracias a
ellas sabe en qué segundo poner cada imagen. **No las borres al grabar.**

### 3. `/trial-reels`
- **Lee:** el guion
- **Escribe:** `contenido/variantes/NNNN-slug-variantes.md`
- **Deja en el tablero:** etapa `variantes`
- Cambia **una sola variable** (por defecto el hook) para que el test enseñe algo

### 4. `/lead-magnet`
- **Lee:** el guion con el que va, `CLAUDENEGOCIO.md`
- **Escribe:** `lead-magnets/slug.html` + publica la página
- Va **fuera de la cadena principal**: se hace cuando un vídeo lo necesita

### 5. `/editor-video`
- **Lee:** `remotion-app/public/grabaciones/`, el guion, `remotion-app/public/capturas/`
- **Escribe:** `salida/NNNN-slug.mp4`
- **Deja en el tablero:** etapa `editado`
- **Pasos internos:** normalizar → transcribir → colocar capturas → renderizar → verificar

Genera además archivos intermedios que no tienes que tocar:
`public/grabaciones/*-norm.mp4`, `public/subtitulos/*.json`, `props/*.json`

---

## Nombres de archivo

Todo usa `NNNN-slug`, con el mismo número en toda la cadena:

```
contenido/guiones/0001-whatsapp-perdido.md
contenido/variantes/0001-whatsapp-perdido-variantes.md
remotion-app/public/grabaciones/0001-whatsapp-perdido.mp4
salida/0001-whatsapp-perdido.mp4
```

Así cualquier agente encuentra las piezas de un vídeo sin preguntarte.

---

## Dónde se rompe (y qué hacer)

| Síntoma | Causa | Solución |
|---|---|---|
| El agente no ve las skills | La sesión se abrió en otra carpeta | Abrirla en `Agencia de videos` |
| `No frame found at position` | Grabación con frame rate variable | Falta el paso de normalizar |
| Las capturas salen en mal sitio | El guion perdió las marcas `[CAPTURA:]` | Recuperarlas en el guion |
| El agente inventa cifras | No debería | Está prohibido en `CLAUDENEGOCIO.md`. Corrígelo y avisa |
| Whisper falla al instalar | Ruta con espacios | Se instala en `~/.whisper-cpp`, fuera del proyecto. No lo muevas |

---

## Lo que sigue siendo tuyo

Ningún agente puede: grabar el vídeo, decidir si un guion es bueno, poner precio a tus
servicios, ni publicar en las plataformas. El pipeline te quita el trabajo mecánico,
no el criterio.
