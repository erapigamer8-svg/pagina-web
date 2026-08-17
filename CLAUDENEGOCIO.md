# CLAUDENEGOCIO.md — Eraps Project

> Base compartida. **Todas las skills de contenido leen este archivo primero.**
> Actualizar con `/update-negocio`.

## Objetivo (manda sobre todo lo demás)

**No se buscan seguidores. Se buscan clientes y confianza.**

Los vídeos son un embudo, no el producto. Un vídeo con 5.000 visitas que trae 3 conversaciones
por WhatsApp vale más que uno con 200.000 que no trae ninguna.

Consecuencias prácticas, aplicables a cualquier decisión:

- Ante la duda entre **alcance** y **credibilidad**, gana credibilidad.
- Un hook que atrae al público equivocado (programadores, curiosos de IA) es un mal hook aunque
  reviente de visitas: esa gente no contrata automatizaciones para su gestoría.
- Mejor enseñar trabajo real —aunque sea pequeño— que explicar teoría que suena impresionante.
- Todo vídeo debe dejar claro **qué problema de negocio resuelve** y que él sabe resolverlo.
- Nada de trucos de engagement que inflan números sin generar confianza.

**Métricas que importan:** conversaciones iniciadas, lead magnets entregados, clientes cerrados.
Las visitas solo importan como medio para llegar a eso.

## Identidad del Negocio
- **Nombre:** Eraps Project
- **Qué vende:** automatizaciones de ventas y atención al cliente con IA
- **Cómo se dice al cliente:** "dejas de perder clientes por no contestar a tiempo"
- **Mercado objetivo:** pymes locales de servicios — clínicas, gestorías, inmobiliarias, talleres, restaurantes, centros de estética
- **Idioma:** español
- **Estado (2026-08-16):** sin clientes todavía, sin vídeos publicados

## Tono de Comunicación
- Tuteo siempre. Cercano y directo.
- Frases cortas. Cero lenguaje corporativo.
- Prohibido: "sinergia", "potenciar", "solución integral", "en la era de la IA", "revolucionar"
- Hablar del **problema del cliente**, no de la herramienta. Kommo y n8n son medios, no el mensaje.
- Nada de promesas de ingresos ni resultados inventados.

## Stack Tecnológico

**IMPORTANTE: Kommo y n8n son dos caminos ALTERNATIVOS, no se combinan.**
Cada proyecto va por uno o por el otro, según lo que necesite el cliente.
Nunca escribir "Kommo y n8n" como si fueran un solo sistema — es "Kommo **o** n8n".

| Camino | Cuándo | Qué incluye |
|---|---|---|
| **Kommo** | El negocio necesita orden comercial: ver los leads, no perder seguimientos | CRM de WhatsApp/Instagram, Salesbot no-code, bandeja unificada, pipelines |
| **n8n** | Hace falta lógica o integraciones que un CRM cerrado no cubre | Automatización a medida: WhatsApp, Google Calendar, web, facturación |

| Herramienta interna | Para qué |
|---|---|
| Remotion | Render de los vídeos (`remotion-app/`) |
| Whisper local | Transcripción en español para subtítulos y cortes |

## El Dolor que Resolvemos
La pyme vende por WhatsApp desde el móvil personal del dueño o una cuenta compartida. Consecuencias:
- Mensajes sin contestar fuera de horario → el lead se va a la competencia
- Nadie sabe cuántos presupuestos hay abiertos ni en qué estado
- Se pierde el histórico si se va un empleado
- Cero seguimiento: se contesta una vez y nunca se vuelve a insistir

## Servicios
| Servicio | Descripción para cliente | Precio | Estado |
|---|---|---|---|
| Implantación Kommo | Tu WhatsApp organizado: pipeline, respuestas automáticas, nada se pierde | *pendiente* | planificado |
| Automatización a medida (n8n) | Conectar tu CRM con lo que ya usas: agenda, facturación, web | *pendiente* | planificado |

> **Pendiente de definir:** precios de setup y retainer. No inventar cifras en el contenido.

## Estrategia de Contenido
Canales: TikTok, YouTube Shorts, Instagram Reels. Vertical 1080x1920.
El usuario **sale en cámara**, habla en español, apoya con **capturas de pantalla** (no vídeo de pantalla).

### Audiencias (se elige una por vídeo)
| Clave | A quién | Enfoque |
|---|---|---|
| `persona` | Público general curioso de IA | Alcance. Entretener/sorprender, cerrar sugiriendo el uso en negocio |
| `empresa` | Dueños de pyme local | **Conversión.** Su problema en su idioma, sin tecnicismos |
| `venta` | Quien ya me sigue | Mostrar mi trabajo, casos, oferta. CTA directo |

### Formatos y reparto sugerido
| Formato | Peso | Nota |
|---|---|---|
| Problemas de negocio que la IA resuelve | 40% | Motor de conversión. No requiere clientes previos |
| Casos reales con resultados | 25% | Máxima prueba. Sin clientes aún → usar demos y montajes propios, **declarados como demo** |
| Tutoriales prácticos n8n/Kommo | 25% | Autoridad y guardados |
| Novedades de IA | 10% | Solo como gancho de actualidad, siempre aterrizado a la pyme |

## Reglas Innegociables
1. Nunca inventar cifras, clientes ni resultados. Si es demo, se dice que es demo.
2. Todo vídeo aterriza en un negocio real, no en la tecnología.
3. Un CTA por vídeo, no tres.
4. Si no aporta valor sin el CTA, el vídeo no vale.

## Branding Visual
> **Pendiente:** colores, tipografía y logo sin definir. Hasta entonces, las skills usan
> alto contraste, tipografía sans-serif gruesa y subtítulos legibles en móvil.

## Assets Creados
- `remotion-app/` — proyecto Remotion funcionando (render verificado)
- `.claude/skills/` — 5 skills de contenido
