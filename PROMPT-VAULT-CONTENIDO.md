# Prompt — Segundo cerebro de contenido (Obsidian)

> Pégalo entero en una conversación nueva. Adjunta los archivos que se listan en
> MATERIAL FUENTE. Adaptado del prompt original de automatizaciones.

---

Quiero que actúes como un experto en sistemas de conocimiento, productividad y organización en Obsidian.

Tu tarea es crear un sistema completo de "segundo cerebro" listo para usar, para mi trabajo REAL de creación de contenido en vídeo.

IMPORTANTE: NO expliques nada. SOLO devuelve archivos listos para copiar en Obsidian.

---

## ⚠️ REGLA CRÍTICA DE DATOS (LA MÁS IMPORTANTE)

Este NO es un vault de demostración. Es mi sistema de trabajo real.

- NO inventes NADA: ni vídeos, ni ideas, ni hooks, ni fechas, ni visitas, ni retención, ni progreso.
- Usa ÚNICAMENTE la información de este prompt y de los archivos adjuntos.
- Donde falte un dato, escribe literalmente `[PENDIENTE]`. Nunca lo rellenes con algo verosímil.
- Si algo lo deduces pero no está escrito, márcalo como `(supuesto)`.
- Prefiero una nota con 5 `[PENDIENTE]` antes que una nota con un solo dato inventado.

**Aquí esta regla muerde más fuerte que en cualquier otro vault:**

No he publicado **ningún** vídeo todavía. Eso significa que **no existe una sola métrica propia**:
cero visitas, cero retención, cero conversaciones, cero leads. Cualquier número de rendimiento que
aparezca en una nota mía está inventado por definición. Las únicas cifras reales que tengo son:

- Las de las **referencias ajenas** (`contenido/referencias/`), que son de otras cuentas.
- Las del **sistema en producción** que monté: 860 conversaciones, 115 solicitudes, 745 leads.
  Esas son de un cliente de automatización, **no** de contenido, y no se mezclan.

No inventes ideas de vídeo "de ejemplo" para llenar carpetas. Si una carpeta tiene que quedar
con solo su nota índice, que quede así.

---

## ⚠️ REGLA CRÍTICA DE CONVIVENCIA

Ya tengo un sistema funcionando: `contenido/estado.md`. Es un tablero que leen y escriben cinco
agentes automáticos. **Ese archivo es la única fuente de verdad sobre en qué etapa está cada vídeo.**

El vault de Obsidian **no lo sustituye ni lo duplica**. Se reparten así:

| `contenido/estado.md` (el tablero) | El vault de Obsidian |
|---|---|
| Etapa de cada ID | Pensamiento, criterio y aprendizaje |
| Qué agente puede tocar qué | Biblioteca de referencias y recursos |
| Rutas de los archivos generados | Revisión semanal y decisiones |
| Lo leen las máquinas | Lo leo yo |

Reglas duras:

1. Cada nota de vídeo del vault **refleja** una fila del tablero. Nunca la contradice.
2. Si hay discrepancia entre el vault y el tablero, **manda el tablero**.
3. Las notas de vídeo enlazan a la **ruta real** del archivo (`contenido/guiones/0001-….md`),
   no copian su contenido.
4. El vault **no inventa IDs**. Los IDs los asigna `/ideas-contenido` en el tablero.

---

## MATERIAL FUENTE

Adjunto estos archivos. Son la única fuente de verdad:

- `CLAUDENEGOCIO.md` — objetivo, tono, stack, audiencias, formatos, reglas innegociables
- `FLUJO.md` — cómo se pasan el trabajo los agentes y dónde va cada cosa
- `contenido/estado.md` — el tablero: etapas, reglas de ID, tabla de resultados
- `contenido/referencias/ref-01.md` … `ref-08.md` — las ocho referencias ya analizadas
- `contenido/referencias/_PLANTILLA.md` — qué datos pido de cada referencia y por qué
- `.claude/skills/*/SKILL.md` — las cinco skills (`ideas-contenido`, `copywriter`,
  `trial-reels`, `lead-magnet`, `editor-video`)

Si un archivo no está, no lo supongas: marca `[PENDIENTE]`.

NO adjunto, pero EXISTEN y hay que documentarlos como recursos:

- `remotion-app/` — el proyecto de render (composiciones, `props/`, `scripts/`)
- `remotion-app/scripts/` — `normalizar`, `transcribir`, `transcribir-referencia`,
  `instalar-whisper`, `whisper-config`, `ffmpeg-bin`
- `landing/` — la landing publicada en eraps-project.vercel.app, con la banda de pruebas reales

---

## CONTEXTO

### PERFIL

Nombre: Mateo Rivelino
Marca: Eraps Project
Rol: freelance de automatizaciones que usa el vídeo como embudo
Ubicación: México
Idioma de todo: español

**El vídeo no es el producto.** El producto son las automatizaciones de WhatsApp para pymes
locales (clínicas, gestorías, talleres, inmobiliarias, centros de estética). Los vídeos existen
para que esa gente confíe en mí y me escriba.

### OBJETIVO (manda sobre todo lo demás)

**No busco seguidores. Busco clientes y confianza.**

Un vídeo con 5.000 visitas que trae 3 conversaciones por WhatsApp vale más que uno con 200.000
que no trae ninguna.

Consecuencias que el vault tiene que reflejar en su estructura, no solo mencionar:

- Ante la duda entre **alcance** y **credibilidad**, gana credibilidad.
- Un hook que atrae al público equivocado (programadores, curiosos de IA) es un mal hook aunque
  reviente de visitas.
- En cualquier tabla de resultados, **conversaciones y leads van antes que visitas**, y visualmente
  por delante.

### CÓMO SALGO EN LOS VÍDEOS

Vertical 1080x1920. Salgo a cámara hablando en español, y apoyo con **capturas de pantalla**
(no grabación de pantalla). Los subtítulos se generan con Whisper local y se montan en Remotion.

### AUDIENCIAS (se elige UNA por vídeo)

| Clave | A quién | Para qué |
|---|---|---|
| `persona` | Público general curioso de IA | Alcance |
| `empresa` | Dueños de pyme local | **Conversión** |
| `venta` | Quien ya me sigue | Enseñar mi trabajo, CTA directo |

### FORMATOS Y REPARTO

| Formato | Peso |
|---|---|
| Problemas de negocio que la IA resuelve | 40% |
| Casos reales con resultados | 25% |
| Tutoriales prácticos n8n/Kommo | 25% |
| Novedades de IA aterrizadas a la pyme | 10% |

### EL PIPELINE (columna vertebral del sistema)

Siete etapas. Toda nota de vídeo debe indicar EN QUÉ ETAPA está.

| Etapa | Significa | Quién la deja así |
|---|---|---|
| `idea` | Idea aprobada, con ID, sin guion | `/ideas-contenido` |
| `guion` | Guion escrito, listo para grabar | `/copywriter` |
| `variantes` | Hooks alternativos para testear | `/trial-reels` |
| `grabado` | Ya grabé el vídeo | **yo, a mano** |
| `editado` | Renderizado en vertical con subtítulos | `/editor-video` |
| `publicado` | Subido a las plataformas | **yo, a mano** |
| `descartado` | No se hace. Anotar motivo | cualquiera |

Cada vídeo lleva un **ID de 4 dígitos que no cambia nunca** (`0001`, `0002`…). Un ID no se
reutiliza jamás, ni siquiera si el vídeo se descartó.

### ESTADO REAL HOY (agosto 2026)

Esto es lo que hay. Ni una pieza más:

- **Referencias analizadas: 8** (`ref-01` a `ref-08`). Son las que tienen datos reales.
- **Vídeos en el tablero: 0.** El tablero de `estado.md` está vacío.
- **Ideas guardadas: 0.** `contenido/ideas/` no tiene archivos.
- **Guiones: 0.** **Variantes: 0.** **Publicados: 0.**
- **Lead magnets: 0.** La carpeta `lead-magnets/` está vacía.
- `salida/` solo tiene dos renders de prueba técnica (`ejemplo-test.mp4`,
  `prueba-vertical.mp4`), que no son contenido.
- Nunca he lanzado `/ideas-contenido`.

Por tanto: `Vídeos/` va a quedar **solo con su nota índice**, y `Ideas/` solo con las ideas crudas
que aparecen más abajo. Está bien. No lo rellenes.

### LO QUE SÍ SÉ DE LAS REFERENCIAS

De los ocho análisis salieron dos conclusiones reales que deben quedar en `Sistema/`:

1. **El ratio visitas ÷ seguidores es lo único que distingue un formato ganador de una cuenta
   grande.** 500.000 visitas con 2.000.000 de seguidores no enseña nada; 500.000 con 3.000 sí.
2. **`ref-07` es la referencia más útil: mejor hook y peor resultado.** Hook perfecto para el
   nicho, pero detrás solo promesas y cero demostración. Patrón a evitar.

El resto de conclusiones sácalas de los archivos adjuntos. No las supongas.

### IDEAS CRUDAS (sin validar, sin ID, fuera del tablero)

Anótalas como ideas SIN validar. No inventes resultados, ni hooks, ni guiones para ellas.

- Enseñar el sistema de la fumigadora por dentro, con los nombres tapados
- Grabar el agente recepcionista contestando en directo y enseñar las diez herramientas
- Contar por qué probé el bot en mi propio número antes de venderlo
- Qué preguntar antes de automatizar un negocio, y cuándo NO merece la pena
- La diferencia entre Kommo y n8n explicada para alguien que no sabe qué es un CRM
- Lead magnet: checklist de "tu WhatsApp pierde clientes si…"
- Serie por rubro: el mismo sistema contado para clínica, taller y gestoría

---

## TU TAREA

### 1. ESTRUCTURA DE CARPETAS

- `Referencias/`
- `Vídeos/`
- `Ideas/`
- `Recursos/`
- `Sistema/`
- `Templates/`

### 2. NOTAS POR CARPETA

Crea todas las notas que los datos reales permitan. NO rellenes por cuota.

- **`Referencias/`** — una nota por cada `ref-01` … `ref-08`, con sus datos reales, más una nota
  índice con una tabla comparativa (plataforma, visitas, seguidores, ratio, veredicto) para ir
  sumando las próximas.
- **`Vídeos/`** — solo la nota índice, porque el tablero está vacío. La índice explica cómo se
  crea una ficha nueva cuando `/ideas-contenido` asigne el primer ID.
- **`Ideas/`** — una nota por cada idea cruda de la lista de arriba, más una índice.
- **`Recursos/`** — una nota por cada pieza reutilizable que EXISTE: el proyecto Remotion, los
  scripts de Whisper/FFmpeg, la plantilla de referencia, la banda de pruebas de la landing.
  Nada de recursos aspiracionales.
- **`Sistema/`** — las notas de la sección 8.

### 3. TEMPLATES REUTILIZABLES

Dentro de `Templates/`:

- Template Referencia
- Template Idea cruda
- Template Vídeo (la ficha por ID, cubre todo el recorrido)
- Template Guion
- Template Variantes (trial reels)
- Template Recurso reutilizable
- Template Publicación y resultados
- Template Revisión semanal

### 4. NAMING CONVENTION

Crea una nota en `Sistema/` con reglas claras y aplícalas en TODOS los archivos.

Base obligatoria, para que el vault y el tablero no se desincronicen:

- Vídeos: `NNNN — Título corto.md` (los mismos 4 dígitos que el tablero, sin excepción)
- Referencias: `ref-NN — Título corto.md`
- Ideas crudas: `Idea — Título corto.md` (sin número, porque aún no tienen ID)
- Fechas siempre `AAAA-MM-DD`

### 5. SISTEMA DE TAGS

Define y usa estos tags. Etiquetas anidadas para que etapa y tipo no choquen:

- **Tipo:** `#referencia` `#idea` `#video` `#recurso` `#sistema`
- **Audiencia:** `#audiencia/persona` `#audiencia/empresa` `#audiencia/venta`
- **Canal:** `#canal/tiktok` `#canal/shorts` `#canal/reels`
- **Etapa:** `#etapa/idea` `#etapa/guion` `#etapa/variantes` `#etapa/grabado`
  `#etapa/editado` `#etapa/publicado` `#etapa/descartado`
- **Formato:** `#formato/problema` `#formato/caso` `#formato/tutorial` `#formato/novedad`

Cada nota debe tener entre 2 y 5 tags.

### 6. INTERCONEXIÓN

Conecta todo con `[[wikilinks]]`.

- Cada vídeo enlaza a la referencia que lo inspiró, a su guion, a sus variantes y a los recursos
  que usa; y al revés.
- Cada idea cruda que se promueva a vídeo deja escrito a qué ID pasó.
- Cada referencia enlaza a los vídeos que salieron de ella (hoy: ninguno, marcar `[PENDIENTE]`).

### 7. CÓMO DEBE SER CADA NOTA DE VÍDEO

Fechas en `AAAA-MM-DD`. El presente es agosto 2026.

```
## Estado
(Activo / Pausado / Publicado / Descartado)

## Etapa del pipeline
- idea / guion / variantes / grabado / editado / publicado / descartado
- Debe coincidir con la fila del ID en `contenido/estado.md`

## Ficha
- ID:
- Audiencia (persona / empresa / venta):
- Formato (problema / caso / tutorial / novedad):
- Canales:
- Archivo actual (ruta real en `contenido/`):
- Última actualización:

## Hook
- El texto exacto de los primeros 3 segundos, o [PENDIENTE]

## Qué problema de negocio resuelve
- En el idioma del cliente, no en el de la herramienta

## Qué prueba enseña
- Capturas o material propio que aparece. Si no hay ninguno, [PENDIENTE]
- Recordatorio: nombres de clientes y de sus clientes finales van tapados

## Un solo CTA
- Uno. No tres.

## Tareas
- Solo tareas reales derivadas del material fuente

## Bloqueos
- Reales, o [PENDIENTE]

## Resultados
- Solo si la etapa es `publicado`. Si no: [PENDIENTE]
- Orden obligatorio: Conversaciones · Leads · Retención 3s · Visitas
- Las visitas van las ÚLTIMAS a propósito

## Qué aprendimos
- Solo después de publicar, o [PENDIENTE]

## Log
- Solo entradas con fecha verificable en el material fuente
- Si no hay ninguna, dejar el encabezado con [PENDIENTE]

## Próximos pasos
```

### 8. NOTAS DE `Sistema/`

Crea:

- **El pipeline de contenido** — las siete etapas, quién deja cada una, y la regla del ID
- **Cómo se coordinan los agentes** — por qué `estado.md` manda y el vault no lo duplica
- **Objetivo: clientes, no seguidores** — y qué decisiones concretas cambia
- **Qué puedo decir y qué no** — el trabajo real (860 / 115 / 745), la fórmula correcta
  ("monté el sistema de…") frente a las prohibidas ("mis clientes consiguen…", "cartera de
  clientes"), y las reglas de privacidad de las capturas
- **Kommo o n8n, nunca los dos** — son caminos alternativos; escribir "Kommo y n8n" como si
  fueran un solo sistema es un error de fondo, no de estilo
- **Cómo elegir una referencia** — el ratio visitas ÷ seguidores y por qué el hook transcrito
  literal es el dato más valioso
- **Audiencias y formatos** — las tres audiencias y el reparto 40/25/25/10
- **Revisión semanal** — checklist corto de 4 preguntas: qué está esperando que yo grabe, qué
  toca editar, qué idea cruda merece subir al tablero, y qué aprendí de lo último que publiqué.
  Día: lunes (supuesto)
- **Naming conventions**
- **Sistema de tags**
- **Cómo uso Obsidian con este vault** — y cuándo NO usarlo (todo lo que toque etapas va al tablero)

### 9. FORMATO DE SALIDA

Separa cada archivo así:

```
--- FILE: Carpeta/Nombre del archivo.md ---
(contenido)
```

### 10. REGLAS FINALES

- Escribir en español de México. Tuteo. Frases cortas.
- Prohibido: "sinergia", "potenciar", "solución integral", "en la era de la IA", "revolucionar"
- Markdown limpio
- Cada nota abre con frontmatter YAML: `tags`, `estado`, `etapa`, `id`, `audiencia`, `actualizado`
- Nada inventado — `[PENDIENTE]` donde falte el dato
- Evitar contenido genérico
- NO explicar nada fuera de los archivos
