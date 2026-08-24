---
tags: [sistema, referencia]
estado: Activo
etapa: no aplica
id: no aplica
audiencia: no aplica
actualizado: 2026-08-23
---

# Cómo elegir una referencia

Una referencia sirve para copiar **estructura**, nunca tema. Para saber si esa estructura funcionó
de verdad hacen falta dos datos, y solo dos.

## 1. El ratio visitas ÷ seguidores

**Es lo único que distingue un formato ganador de una cuenta grande.**

- 500.000 visitas con 2.000.000 de seguidores → normal, es su audiencia. No enseña nada.
- 500.000 visitas con 3.000 seguidores → el formato funcionó solo. **Eso** es lo que hay que copiar.

Sin esos dos números, el agente solo puede imitar el estilo por encima, que es justo lo que no quiero.

**Hoy no tengo seguidores de ninguna de las ocho referencias.** El ratio de las ocho está en
`[PENDIENTE]`. Ver [[Índice — Referencias]].

## 2. El hook exacto, transcrito literal

**Es el dato más valioso del archivo.** Es la parte que decide si el vídeo funciona, y la que
`/ideas-contenido` y `/copywriter` van a estudiar para sacar los míos.

Literal quiere decir literal: las palabras que dice en los primeros 3 segundos, aunque queden
cortadas a mitad de frase.

## Qué mirar del hook

- **Estructura:** ¿pregunta, cifra, contradicción, error común, resultado enseñado antes de explicarlo?
- **Promesa:** qué le prometió al espectador para que se quedara.
- **Formato:** talking head, demo, lista, antes/después, sketch.
- **Por qué retuvo:** qué tensión mantiene hasta el final.

## Los agentes no pueden ver vídeos

Dejar un `.mp4` en `contenido/referencias/` no sirve de nada: nadie puede mirarlo. Hacen falta
los **datos** y el **texto**. Si algo visual importa, captura de pantalla junto al archivo.

Atajo para no transcribir a mano, desde `remotion-app/`:

```powershell
npx tsx scripts/transcribir-referencia.mts "C:\ruta\al\video.mp4" "nombre-corto"
```

Deja el archivo montado con el hook separado y la transcripción debajo. Solo hay que rellenar
visitas y seguidores, que no están en el audio. Ver [[Recurso — Scripts de Whisper y FFmpeg]].

## Las dos conclusiones de las ocho primeras

1. **El ratio manda.** Sin seguidores, un número de visitas grande no prueba nada.
2. **[[ref-07 — WhatsApp convertido en CRM]] es la más útil de todas: mejor hook y peor resultado.**
   Hook perfecto para el nicho, y detrás solo promesas. Patrón a evitar. Un éxito enseña menos.

## Señal de alarma

Si todas las referencias son del mismo estilo, estoy construyendo un canal monótono. Hoy cinco de
ocho van de Claude Code / herramientas de IA. Ver [[Índice — Referencias]].

Relacionadas: [[Template — Referencia]] · [[Recurso — Plantilla de referencia]] · [[Objetivo — clientes, no seguidores]]
