---
tags: [sistema, video]
estado: Activo
etapa: no aplica
id: no aplica
audiencia: no aplica
actualizado: 2026-08-23
---

# Cómo se coordinan los agentes

Cada agente es una sesión de terminal **independiente**. No pueden mandarse mensajes entre ellos:
ese canal no existe.

Se coordinan de dos formas:

1. **Archivos.** Uno escribe en una carpeta, el siguiente lee de ahí.
2. **`contenido/estado.md`.** El tablero compartido. Cada agente lo lee al empezar y actualiza
   su fila al terminar.

No hace falta tenerlos abiertos a la vez. Puedo usar uno hoy y otro mañana: el trabajo queda en disco.

## Por qué manda el tablero

**El tablero es la única fuente de verdad, no los archivos.** Un archivo de ideas puede tener
12 propuestas y solo 3 haber avanzado. Eso solo lo sabe la tabla.

Por eso `/copywriter` sabe que solo puede escribir guiones de filas en etapa `idea` sin
preguntarme nada.

## El reparto con este vault

| `contenido/estado.md` | Este vault |
|---|---|
| Etapa de cada ID | Pensamiento, criterio y aprendizaje |
| Qué agente puede tocar qué | Biblioteca de referencias y recursos |
| Rutas de los archivos generados | Revisión semanal y decisiones |
| Lo leen las máquinas | Lo leo yo |

Reglas duras:

1. Cada ficha de vídeo del vault **refleja** una fila del tablero. Nunca la contradice.
2. Si hay discrepancia entre vault y tablero, **manda el tablero**.
3. Las fichas enlazan a la **ruta real** del archivo (`contenido/guiones/0001-….md`). No copian su contenido.
4. El vault **no inventa IDs**.

## La cadena

```
Yo                →  contenido/referencias/
/ideas-contenido  →  contenido/ideas/ideas-AAAA-MM-DD.md          (deja etapa idea)
/copywriter       →  contenido/guiones/NNNN-slug.md               (deja etapa guion)
/trial-reels      →  contenido/variantes/NNNN-slug-variantes.md   (deja etapa variantes)
/lead-magnet      →  lead-magnets/slug.html                       (fuera de la cadena)
Yo                →  GRABO en remotion-app/public/grabaciones/    (etapa grabado)
/editor-video     →  salida/NNNN-slug.mp4                         (deja etapa editado)
Yo                →  SUBO y apunto resultados en el tablero       (etapa publicado)
```

## Lo que pongo yo

| Qué | Dónde |
|---|---|
| Referencias | `contenido/referencias/` — ver [[Recurso — Plantilla de referencia]] |
| Grabaciones | `remotion-app/public/grabaciones/` (dentro de `public/`, o Remotion no las encuentra) |
| Capturas | `remotion-app/public/capturas/` |

## El contrato oculto entre copywriter y editor

Las marcas **`[CAPTURA: descripción]`** dentro del guion. Gracias a ellas `/editor-video` sabe
en qué segundo poner cada imagen. **No se borran al grabar.**

## Dónde se rompe

| Síntoma | Causa | Solución |
|---|---|---|
| El agente no ve las skills | La sesión se abrió en otra carpeta | Abrirla en `Agencia de videos` |
| `No frame found at position` | Grabación con frame rate variable | Falta normalizar. Ver [[Recurso — Scripts de Whisper y FFmpeg]] |
| Las capturas salen en mal sitio | El guion perdió las marcas `[CAPTURA:]` | Recuperarlas en el guion |
| El agente inventa cifras | No debería | Está prohibido en `CLAUDENEGOCIO.md`. Corregirlo y avisar |
| Whisper falla al instalar | Ruta con espacios | Se instala en `~/.whisper-cpp`, fuera del proyecto. No moverlo |

Relacionadas: [[El pipeline de contenido]] · [[Cómo uso Obsidian con este vault]]
