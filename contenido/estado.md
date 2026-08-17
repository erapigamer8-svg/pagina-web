# Estado del pipeline

**Este archivo es cómo se hablan los agentes.** No pueden mandarse mensajes entre sí,
así que se coordinan aquí: cada uno lo lee al empezar y actualiza su fila al terminar.

## Reglas para los agentes

1. **Al empezar:** lee esta tabla para saber qué hay pendiente en tu etapa.
2. **Al terminar:** actualiza la fila del vídeo — etapa nueva, fecha, y la ruta del archivo que dejaste.
3. **Nunca borres filas.** Si un vídeo se descarta, ponle etapa `descartado` y anota por qué.
4. **Si algo te falta** para trabajar, escríbelo en "Bloqueado por" y déjalo ahí. El usuario lo verá.
5. Un vídeo solo avanza de etapa cuando su archivo **existe de verdad** en la ruta indicada.

## El ID manda

Esta tabla es **la única fuente de verdad**. Los archivos sueltos no lo son: un archivo de ideas
puede tener 12 propuestas y solo 3 haber avanzado. Solo la tabla sabe cuáles.

### Cómo se asignan los IDs
- El ID es de **4 dígitos** (`0001`, `0002`, …) y **no cambia nunca**.
- Para asignar uno nuevo: mira el **ID más alto de toda la tabla** —incluidos `descartado` y
  `publicado`— y suma 1.
- **Un ID nunca se reutiliza**, ni siquiera si su vídeo se descartó.

### Antes de crear algo nuevo (obligatorio)
Lee **todas** las filas, de todas las etapas, y compara con lo que vas a proponer.
Si ya existe una fila que cubre lo mismo:
- **No lo dupliques.** Dilo: *"la idea X ya está en el tablero como 0007, en etapa guion"*.
- Si de verdad aporta un ángulo distinto, créalo pero **anota en Notas de qué ID se diferencia y en qué**.

### Antes de trabajar sobre un ID (obligatorio)
Comprueba en qué etapa está:
- **Si ya pasó tu etapa** → no rehagas nada. Avisa al usuario y pregúntale si quiere rehacerlo
  a propósito.
- **Si aún no llegó a tu etapa** → falta un paso previo. Dilo en vez de improvisar.

Ejemplo: `/copywriter` solo escribe guiones de filas en etapa `idea`. Si una fila ya está en
`guion`, `variantes` o más allá, **ya tiene guion** — no se escribe otro salvo que el usuario
lo pida expresamente.

## Etapas

| Etapa | Significa | Quién la deja así |
|---|---|---|
| `idea` | Idea aprobada, sin guion | `/ideas-contenido` |
| `guion` | Guion escrito, listo para grabar | `/copywriter` |
| `variantes` | Hooks alternativos listos para testear | `/trial-reels` |
| `grabado` | El usuario ya grabó el vídeo | **el usuario** (a mano) |
| `editado` | Vídeo final renderizado | `/editor-video` |
| `publicado` | Subido a las plataformas | **el usuario** (a mano) |
| `descartado` | No se hace. Anotar motivo | cualquiera |

---

## Tablero

| ID | Título | Etapa | Audiencia | Último archivo | Notas / Bloqueos | Actualizado |
|---|---|---|---|---|---|---|
| _(vacío — aún no hay vídeos)_ | | | | | | |

---

## Ejemplos de filas

```
| 0001 | WhatsApp perdido        | guion      | empresa | contenido/guiones/0001-whatsapp-perdido.md | —                          | 2026-08-16 |
| 0002 | Recepcionista 24h       | idea       | empresa | contenido/ideas/ideas-2026-08-16.md         | —                          | 2026-08-16 |
| 0003 | 3 apps de IA            | descartado | persona | —                                           | Genérico, no es diferencial | 2026-08-16 |
| 0004 | Presupuestos a mano     | idea       | empresa | contenido/ideas/ideas-2026-08-16.md         | Ángulo distinto al 0001: coste, no velocidad | 2026-08-16 |
```

Leyendo esa tabla, `/copywriter` sabe al instante que **solo puede trabajar el 0002 y el 0004**:
el 0001 ya tiene guion y el 0003 está descartado. Sin la tabla tendría que adivinarlo.

## Notas de resultados

Cuando publiques, apunta aquí lo que funcionó. **Esto vale más que cualquier referencia ajena**,
porque son datos de tu propia audiencia. `/ideas-contenido` los lee para mejorar.

**El objetivo son clientes, no seguidores** — por eso las dos últimas columnas mandan sobre las visitas.

| ID | Plataforma | Visitas | Retención 3s | **Conversaciones** | **Leads / clientes** | Qué aprendimos |
|---|---|---|---|---|---|---|
