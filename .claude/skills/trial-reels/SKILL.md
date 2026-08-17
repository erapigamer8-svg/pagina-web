---
name: trial-reels
description: Divide un guion en varias variantes para testear (trial reels) cambiando una sola variable, y propone mejoras al guion para que retenga más. Úsalo cuando el usuario diga /variantes, pida trial reels, o quiera sacar varios vídeos del mismo guion.
---

# Agente 3 — Trial Reels / Variantes

Sacas varias versiones testeables de un mismo guion. Tu trabajo es que los resultados **enseñen algo**.

## Principio que no se rompe

Un test solo sirve si cambia **una variable por vez**. Si una variante cambia hook, cuerpo y CTA, y funciona mejor, no sabes por qué — y no puedes repetirlo.

Por defecto: **mismo cuerpo, mismo CTA, solo cambia el hook.** El hook es la variable de mayor impacto en vertical, así que es la que conviene aislar primero.

Si el usuario quiere cambiar otra cosa (duración, CTA, apertura visual), perfecto — pero una sola, y se declara cuál en el archivo.

## Paso 0 — Contexto

1. Lee `CLAUDENEGOCIO.md` y el guion de `contenido/guiones/`.
2. Lee `contenido/estado.md`. **Solo trabajas filas en etapa `guion`.**
   Si ya está en `variantes`, ese vídeo **ya tiene sus variantes**: no generes otras sin que el
   usuario te lo pida. Si aún está en `idea`, le falta el guion — dilo en vez de improvisarlo.
3. Al terminar, pasa la fila a etapa `variantes` y anota la ruta del archivo.

## Paso 1 — Auditar el guion antes de multiplicarlo

Multiplicar un guion flojo da 5 vídeos flojos. Revisa primero y propón mejoras concretas:

- **Primeros 3 segundos:** ¿hay alguna palabra desperdiciada? ¿se entiende sin contexto?
- **Segundo 5-10:** es donde más se abandona. ¿Hay razón para seguir ahí?
- **Frases muertas:** "como os decía", "bueno pues", relleno que se puede cortar entero
- **Claridad:** ¿algún tecnicismo que una dueña de gestoría no entendería?
- **Bucle final:** ¿el cierre invita a rever o a comentar?

Preséntale las mejoras y **espera confirmación antes de generar las variantes.**

## Paso 2 — Generar variantes

**4 variantes** por defecto, cada una con un ángulo psicológico distinto para que el test tenga rango:

| Variante | Ángulo | Ejemplo |
|---|---|---|
| A | Dolor directo | "Estás perdiendo clientes cada noche y no lo sabes" |
| B | Curiosidad / incógnita | "Hay un motivo por el que no te contestan el presupuesto" |
| C | Resultado primero | "40 clientes al mes recuperados, sin contratar a nadie" |
| D | Contradicción | "No necesitas más clientes" |

Cada hook: máximo 12 palabras, dicho en menos de 3 segundos. Léelo en voz alta mentalmente — si no cabe, no vale.

## Paso 3 — Entregar

Escribe `contenido/variantes/NNNN-slug-variantes.md`:

```markdown
---
guion_origen: 0001-whatsapp-perdido
variable_testeada: hook
fecha: 2026-08-16
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

## Paso 4 — Recordarle el método
Al terminar, dile: publicar las variantes **con separación de días**, no todas de golpe, y **anotar los resultados en la tabla**. Esa tabla es lo que alimenta a la skill `ideas-contenido` con datos propios — que valen más que cualquier referencia ajena.

## Reglas
- Nunca cambies dos variables a la vez y lo llames test.
- Nada de trucos de engagement bait ("comenta SÍ para..."). Queman alcance y confianza.
- Los trial reels como función nativa son de Instagram; en TikTok y Shorts se publica escalonado y se compara igual.
