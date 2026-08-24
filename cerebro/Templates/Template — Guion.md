---
tags: [sistema, video, formato/problema]
estado: Plantilla
etapa: no aplica
id: no aplica
audiencia: no aplica
actualizado: 2026-08-23
---

# Template — Guion

> **El guion no se escribe en el vault.** Lo escribe `/copywriter` en
> `contenido/guiones/NNNN-slug.md`, y `/editor-video` lo lee de ahí con **este formato exacto**.
> Esta plantilla está aquí para saber qué va a llegar y para poder revisarlo con criterio.

---

```markdown
---
id: 0001-whatsapp-perdido
audiencia: empresa
formato: problema-negocio
duracion_objetivo: 45
fecha: AAAA-MM-DD
hook_elegido: 1
---

## Hooks
1. [hook A]
2. [hook B]
3. [hook C]
4. [hook D]
5. [hook E]

## Guion
(usa el hook elegido y sigue)

Texto hablado, tal cual se dice.

[CAPTURA: pipeline de Kommo con 12 leads sin responder]

Sigue el texto.

## CTA
Frase final exacta.

## Descripción
2-3 líneas para el pie del vídeo.

## Hashtags
5-8, mezcla de nicho y sector. Sin sopa de hashtags genéricos.
```

## Las marcas `[CAPTURA: …]` son el contrato

Le dicen a `/editor-video` en qué segundo entra cada imagen. **No se borran al grabar.**
Sin ellas, el editor puede subtitular pero no colocar capturas.

Ver [[Cómo se coordinan los agentes]].

## Cómo reviso un guion antes de grabarlo

- **Primeros 3 segundos:** ¿alguna palabra desperdiciada? ¿Se entiende sin contexto?
  Sin saludos, sin presentarme, sin "hoy os traigo".
- **Segundo 5-10:** es donde más se abandona. ¿Hay razón para seguir ahí?
- **Frases muertas:** "como os decía", "bueno pues". Fuera enteras.
- **Claridad:** ¿algún tecnicismo que una dueña de gestoría no entendería?
- **Se dice en voz alta.** Si me trabo leyéndolo, se reescribe.
- **Vocabulario prohibido:** ver [[Qué puedo decir y qué no]].
- **Un solo CTA**, coherente con la audiencia. Ver [[Audiencias y formatos]].
- **Sin el CTA, ¿sigue aportando valor?** Si no, el vídeo no vale.

## El CTA por audiencia

| Audiencia | CTA |
|---|---|
| `persona` | Guardar / seguir |
| `empresa` | Comentario que dispara el lead magnet |
| `venta` | Contacto directo |

Relacionadas: [[Template — Vídeo]] · [[Template — Variantes]] · [[El pipeline de contenido]]
