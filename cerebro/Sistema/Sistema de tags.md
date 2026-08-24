---
tags: [sistema, referencia, idea, recurso, video]
estado: Activo
etapa: no aplica
id: no aplica
audiencia: no aplica
actualizado: 2026-08-23
---

# Sistema de tags

Anidados, para que etapa y tipo no choquen. **Entre 2 y 5 tags por nota.** Ni uno ni diez.

En el frontmatter van sin `#`.

## Tipo (uno por nota, obligatorio)

`#referencia` · `#idea` · `#video` · `#recurso` · `#sistema`

## Audiencia

`#audiencia/persona` · `#audiencia/empresa` · `#audiencia/venta`

Una sola por vídeo. En una referencia, solo si el material fuente dice a quién apuntaba.
Ver [[Audiencias y formatos]].

## Canal

`#canal/tiktok` · `#canal/shorts` · `#canal/reels`

En una referencia, el canal donde se publicó. En un vídeo mío, dónde va a subirse.

## Etapa

`#etapa/idea` · `#etapa/guion` · `#etapa/variantes` · `#etapa/grabado` · `#etapa/editado` ·
`#etapa/publicado` · `#etapa/descartado`

**Solo en fichas de vídeo.** Y siempre igual que la fila del tablero. Si cambia el tablero,
cambia el tag. Ver [[Cómo se coordinan los agentes]].

## Formato

`#formato/problema` · `#formato/caso` · `#formato/tutorial` · `#formato/novedad`

Corresponden al reparto 40 / 25 / 25 / 10.

## Las notas de `Sistema/`

Llevan `#sistema` **más el tipo de nota que gobiernan**. Así una nota de criterio aparece en la
búsqueda de aquello sobre lo que manda. [[Naming conventions]] lleva `#video` y `#referencia`
porque nombra esas dos cosas; esta nota los lleva los cinco porque define el vocabulario entero.

## Combinación típica de una ficha de vídeo

```yaml
tags: [video, etapa/guion, audiencia/empresa, formato/problema, canal/tiktok]
```

## Búsquedas que uso

- `tag:#etapa/grabado` → lo que me toca editar el lunes
- `tag:#etapa/variantes` → lo que está esperando que yo grabe
- `tag:#idea` → el banco de ideas crudas
- `tag:#audiencia/empresa` → todo lo que apunta al que paga

Relacionadas: [[Naming conventions]] · [[Revisión semanal]]
