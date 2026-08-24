---
tags: [sistema, video]
estado: Plantilla
etapa: no aplica
id: no aplica
audiencia: no aplica
actualizado: 2026-08-23
---

# Template — Vídeo

> La ficha por ID. Cubre todo el recorrido, de `idea` a `publicado`.
> Nombre del archivo: `NNNN — Título corto.md`, con los **mismos cuatro dígitos del tablero**.
> Copia todo lo que hay debajo de la línea. El frontmatter de arriba es de esta plantilla.

---

```yaml
---
tags: [video, etapa/idea, audiencia/empresa, formato/problema, canal/tiktok]
estado: Activo
etapa: idea
id: "0000"
audiencia: empresa
actualizado: AAAA-MM-DD
---
```

## Estado

(Activo / Pausado / Publicado / Descartado)

## Etapa del pipeline

- idea / guion / variantes / grabado / editado / publicado / descartado
- **Debe coincidir con la fila del ID en `contenido/estado.md`.** Si no coincide, manda el tablero.

## Ficha

- **ID:**
- **Audiencia** (persona / empresa / venta):
- **Formato** (problema / caso / tutorial / novedad):
- **Canales:**
- **Archivo actual** (ruta real en `contenido/`):
- **Última actualización:**

## Hook

- El texto exacto de los primeros 3 segundos, o `[PENDIENTE]`

## Qué problema de negocio resuelve

- En el idioma del cliente, no en el de la herramienta

## Qué prueba enseña

- Capturas o material propio que aparece. Si no hay ninguno, `[PENDIENTE]`
- Recordatorio: nombres de clientes y de sus clientes finales van tapados

## Un solo CTA

- Uno. No tres.

## Tareas

- [ ]

## Bloqueos

- Reales, o `[PENDIENTE]`

## Resultados

- Solo si la etapa es `publicado`. Si no: `[PENDIENTE]`

| **Conversaciones** | **Leads** | Retención 3s | Visitas |
|---|---|---|---|
| | | | |

- Orden obligatorio: Conversaciones · Leads · Retención 3s · Visitas
- Las visitas van las **últimas** a propósito

## Qué aprendimos

- Solo después de publicar, o `[PENDIENTE]`

## Log

- `AAAA-MM-DD` — qué pasó
- Solo entradas con fecha verificable. Si no hay ninguna, dejar el encabezado con `[PENDIENTE]`

## Próximos pasos

-

## Enlaces

- **Referencia que lo inspiró:** [[ ]]
- **Guion:** `contenido/guiones/NNNN-slug.md`
- **Variantes:** `contenido/variantes/NNNN-slug-variantes.md`
- **Recursos que usa:** [[ ]]
- **Idea cruda de la que viene:** [[ ]]

> Y al revés: entra en la referencia y en la idea y escribe este ID allí.

Relacionadas: [[Índice — Vídeos]] · [[El pipeline de contenido]] · [[Naming conventions]]
