---
tags: [recurso, video]
estado: Funcionando
etapa: no aplica
id: no aplica
audiencia: no aplica
actualizado: 2026-08-23
---

# Recurso — Proyecto Remotion

**Qué es:** el proyecto que renderiza los vídeos finales en vertical, con subtítulos y capturas.
**Dónde:** `remotion-app/`
**Quién lo usa:** `/editor-video`, en la etapa `editado`.

## Cómo funciona de verdad

Remotion **no mira el vídeo ni decide nada**. Renderiza de forma determinista lo que le das.
El montaje son dos fases:

1. **Whisper transcribe en local** → texto con marca de tiempo por palabra
2. **Remotion compone** → subtítulos sincronizados, capturas, branding, vertical

Todo local. Sin APIs, sin coste por vídeo, sin exportaciones manuales.
Ver [[Recurso — Scripts de Whisper y FFmpeg]].

## Qué hay dentro

| Carpeta | Qué guarda |
|---|---|
| `src/` | Las composiciones. La que se usa es `VideoVertical` |
| `props/` | Un JSON por vídeo: ruta del vídeo, subtítulos y capturas con sus tiempos |
| `public/grabaciones/` | **Mis grabaciones.** Tienen que estar dentro de `public/` o Remotion no las encuentra |
| `public/capturas/` | Las imágenes que salen sobreimpresas |
| `public/subtitulos/` | Los JSON que deja Whisper |
| `scripts/` | Los `.mts` de normalizar, transcribir e instalar |

## El comando de render

```powershell
npx remotion render VideoVertical ../salida/NNNN-slug.mp4 --props="./props/NNNN-slug.json"
```

Los datos entran **por `--props`**, no tocando el código. Por eso se pueden generar vídeos en lote.

## Verificación después de renderizar

```powershell
ffprobe -v error -show_entries format=duration,size -show_entries stream=codec_name,width,height -of default=noprint_wrappers=1 "../salida/NNNN-slug.mp4"
```

Comprobar: resolución **1080x1920**, duración parecida a la esperada, audio presente.
Y extraer 3-4 fotogramas para mirarlos: subtítulos legibles, capturas en su sitio, nada tapado.

El agente verifica lo objetivo. **Si el vídeo engancha o no, lo juzgo yo.**

## Reglas del render

- Nunca sobreescribir la grabación original.
- Subtítulos: alto contraste, tercio central-bajo. **Fuera del 15% inferior y del 10% superior**,
  que es donde va la interfaz de TikTok.
- Vigilar el espacio en C: antes de renders largos.
- Si un render falla, mirar el error real de Remotion, no un resumen.

## Estado hoy

Funcionando, render verificado. En `salida/` hay dos pruebas técnicas —`ejemplo-test.mp4` y
`prueba-vertical.mp4`— que **no son contenido**. En `props/` hay un `ejemplo.json`.

Vídeos reales renderizados: **0**. Ver [[Índice — Vídeos]].

## Branding

Sin definir: colores, tipografía y logo. Hasta entonces se usa alto contraste, sans-serif gruesa
y subtítulos legibles en móvil. `[PENDIENTE]`

Relacionadas: [[Índice — Recursos]] · [[Cómo se coordinan los agentes]] · [[Audiencias y formatos]]
