---
tags: [sistema, video, etapa/variantes]
estado: Plantilla
etapa: no aplica
id: no aplica
audiencia: no aplica
actualizado: 2026-08-23
---

# Template — Variantes

> Las escribe `/trial-reels` en `contenido/variantes/NNNN-slug-variantes.md`.
> Esta plantilla está aquí para revisarlas y para anotar resultados con criterio.

## El principio que no se rompe

**Un test solo sirve si cambia una variable por vez.** Si una variante cambia hook, cuerpo y CTA,
y funciona mejor, no sé por qué, y no puedo repetirlo.

Por defecto: mismo cuerpo, mismo CTA, **solo cambia el hook**. Es la variable de mayor impacto
en vertical, así que es la que conviene aislar primero.

Si cambio otra cosa (duración, CTA, apertura visual), perfecto, pero **una sola**, y se declara cuál.

---

```markdown
---
guion_origen: 0001-whatsapp-perdido
variable_testeada: hook
fecha: AAAA-MM-DD
---

## Mejoras aplicadas al guion base
- [qué cambió y por qué]

## Variantes
| ID | Hook | Ángulo |
|---|---|---|
| A | ... | dolor |
| B | ... | curiosidad |
| C | ... | resultado |
| D | ... | contradicción |

## Cuerpo común
(idéntico en las 4 — no tocar)

## Registro de resultados
| ID | Plataforma | Visitas | Retención 3s | Fecha | Notas |
|---|---|---|---|---|---|
```

## Los cuatro ángulos

| Variante | Ángulo |
|---|---|
| A | Dolor directo |
| B | Curiosidad / incógnita |
| C | Resultado primero |
| D | Contradicción |

Cada hook: **máximo 12 palabras**, dicho en menos de 3 segundos. Leerlo en voz alta. Si no cabe, no vale.

## Cómo se publican

**Con separación de días, no todas de golpe.** Y anotando los resultados en la tabla.

Los trial reels como función nativa son de Instagram. En TikTok y Shorts se publica escalonado
y se compara igual.

## Por qué importa la tabla de resultados

Es lo que alimenta a `/ideas-contenido` con **datos propios**, que valen más que cualquier
referencia ajena. Hoy esa tabla está vacía en todos los sentidos: cero vídeos publicados.
Ver [[Índice — Vídeos]].

## Nada de engagement bait

"Comenta SÍ para…" quema alcance y confianza. Ver [[Objetivo — clientes, no seguidores]].

Relacionadas: [[Template — Guion]] · [[Template — Publicación y resultados]]
