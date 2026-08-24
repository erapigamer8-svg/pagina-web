---
tags: [sistema, etapa/idea]
estado: Activo
etapa: no aplica
id: no aplica
audiencia: no aplica
actualizado: 2026-08-23
---

# El pipeline de contenido

Siete etapas. Toda ficha de vídeo tiene que decir en cuál está, y coincidir con su fila
en `contenido/estado.md`.

| Etapa | Significa | Quién la deja así |
|---|---|---|
| `idea` | Idea aprobada, con ID, sin guion | `/ideas-contenido` |
| `guion` | Guion escrito, listo para grabar | `/copywriter` |
| `variantes` | Hooks alternativos para testear | `/trial-reels` |
| `grabado` | Ya grabé el vídeo | **yo, a mano** |
| `editado` | Renderizado en vertical con subtítulos | `/editor-video` |
| `publicado` | Subido a las plataformas | **yo, a mano** |
| `descartado` | No se hace. Anotar motivo | cualquiera |

`/lead-magnet` va fuera de la cadena: se lanza cuando un vídeo concreto lo necesita, y anota
el recurso en la columna "Último archivo" de ese vídeo.

## La regla del ID

- El ID es de **4 dígitos** (`0001`, `0002`…) y **no cambia nunca**.
- Se asigna cogiendo el ID más alto de todo el tablero —incluidos `descartado` y `publicado`— y sumando 1.
- **Un ID no se reutiliza jamás**, ni siquiera si el vídeo se descartó.
- Los IDs los asigna `/ideas-contenido` en el tablero. **El vault no inventa IDs.**

El mismo número acompaña a todas las piezas:

```
contenido/guiones/0001-whatsapp-perdido.md
contenido/variantes/0001-whatsapp-perdido-variantes.md
remotion-app/public/grabaciones/0001-whatsapp-perdido.mp4
salida/0001-whatsapp-perdido.mp4
```

## Las dos comprobaciones que hace cada agente

1. **Antes de crear:** lee todas las filas, incluidas `descartado` y `publicado`. Si ya existe algo
   igual, no lo duplica: lo dice.
2. **Antes de trabajar un ID:** mira su etapa. Si ya pasó la suya, no rehace nada y pregunta.
   Si aún no llegó, avisa de que falta un paso previo.

## Las dos etapas que son mías

`grabado` y `publicado`. Ningún agente puede grabar el vídeo, decidir si un guion es bueno,
poner precio a mis servicios ni publicar. El pipeline me quita el trabajo mecánico, no el criterio.

## Estado hoy (2026-08-23)

Tablero vacío. Cero vídeos en cualquier etapa. Nunca he lanzado `/ideas-contenido`.

Relacionadas: [[Cómo se coordinan los agentes]] · [[Naming conventions]] · [[Índice — Vídeos]]
