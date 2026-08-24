---
tags: [sistema, video, referencia]
estado: Activo
etapa: no aplica
id: no aplica
audiencia: no aplica
actualizado: 2026-08-23
---

# Naming conventions

Existen para que el vault y `contenido/estado.md` no se desincronicen.

## Reglas base

| Tipo de nota | Patrón | Ejemplo |
|---|---|---|
| Vídeo | `NNNN — Título corto.md` | `0001 — WhatsApp perdido.md` |
| Referencia | `ref-NN — Título corto.md` | `ref-07 — WhatsApp convertido en CRM.md` |
| Idea cruda | `Idea — Título corto.md` | `Idea — La fumigadora por dentro.md` |
| Recurso | `Recurso — Título corto.md` | `Recurso — Proyecto Remotion.md` |
| Template | `Template — Qué es.md` | `Template — Guion.md` |
| Índice de carpeta | `Índice — Carpeta.md` | `Índice — Referencias.md` |
| Revisión semanal | `Revisión AAAA-MM-DD.md` | `Revisión 2026-08-24.md` |
| Nota de Sistema | Título en lenguaje normal | `Kommo o n8n, nunca los dos.md` |

Separador: raya larga con espacios ` — `. No guion corto.

## Los cuatro dígitos son sagrados

El número de una ficha de vídeo es **el mismo que el del tablero**, sin excepción. Si el tablero
dice `0007`, la nota es `0007 — …`. Nada de `7`, `007` ni `0007b`.

Los IDs los asigna `/ideas-contenido`. **El vault no inventa IDs.** Ver [[El pipeline de contenido]].

## Fechas

Siempre `AAAA-MM-DD`. En el nombre del archivo, en el frontmatter y dentro del texto.
`2026-08-23`, nunca `23/08/26`.

## Títulos cortos

Máximo unas cinco palabras. Es un nombre, no un resumen. El título completo del vídeo o de la
referencia va dentro de la nota.

## Nada de caracteres que Windows no traga

Prohibidos en nombres de archivo: `: \ / * ? " < > |`
Por eso `Objetivo — clientes, no seguidores.md` lleva raya y no dos puntos.

## Frontmatter obligatorio

Toda nota abre con:

```yaml
---
tags: []
estado:
etapa:
id:
audiencia:
actualizado: AAAA-MM-DD
---
```

Campos que no aplican a ese tipo de nota: se escribe `no aplica`.
Campos que aplican pero cuyo dato aún no tengo: se escribe `[PENDIENTE]`.
**No es lo mismo y no se mezclan.**

## Los nombres fuera del vault

Los archivos que generan los agentes usan `NNNN-slug`, en minúsculas y con guiones:

```
contenido/guiones/0001-whatsapp-perdido.md
contenido/variantes/0001-whatsapp-perdido-variantes.md
remotion-app/public/grabaciones/0001-whatsapp-perdido.mp4
salida/0001-whatsapp-perdido.mp4
```

El vault usa el formato legible (`0001 — WhatsApp perdido.md`) y **enlaza a la ruta real**.

Relacionadas: [[Sistema de tags]] · [[Cómo se coordinan los agentes]]
