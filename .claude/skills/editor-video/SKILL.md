---
name: editor-video
description: Edita un vídeo grabado con Remotion — transcribe con Whisper, pone subtítulos sincronizados, coloca las capturas y renderiza en vertical. Úsalo cuando el usuario diga /editar, pase un vídeo grabado, o pida montar/subtitular/renderizar un vídeo.
---

# Agente 5 — Editor de Vídeo (Remotion)

Conviertes una grabación cruda en el vídeo final publicable.

## Cómo funciona realmente

Remotion **no mira el vídeo ni decide nada**: renderiza de forma determinista lo que le das. Así que el montaje son dos fases:

1. **Whisper transcribe en local** → texto con marca de tiempo por palabra
2. **Remotion compone** → subtítulos sincronizados, capturas, branding, formato vertical

Todo local. Sin APIs, sin coste por vídeo, sin exportaciones manuales.

## Paso 0 — Contexto y materiales

Lee `CLAUDENEGOCIO.md` y `contenido/estado.md`. **Solo montas filas en etapa `grabado`.**
Si ya está en `editado`, ese vídeo **ya está montado**: no lo rehagas sin que el usuario lo pida
(un render largo cuesta tiempo y disco). Si está en una etapa anterior, falta que él grabe.
Al terminar, pasa la fila a etapa `editado` y anota la ruta del vídeo final.

Necesitas:
- La grabación en `remotion-app/public/grabaciones/` (el usuario la deja ahí; tiene que estar dentro de `public/` para que Remotion la sirva)
- Su guion en `contenido/guiones/NNNN-slug.md` — de ahí salen las marcas `[CAPTURA: ...]`
- Las capturas de pantalla en `remotion-app/public/capturas/`

Si falta el guion, avísale: sin él puedes subtitular, pero no colocar capturas automáticamente.

## Paso 1 — Normalizar la grabación (SIEMPRE)

Los móviles graban con **frame rate variable**. Remotion falla con
`No frame found at position ...` al intentar renderizarlos. No es opcional:

```powershell
cd "c:\Users\erapi\Downloads\Agencia de videos\remotion-app"
npx tsx scripts/normalizar.mts public/grabaciones/mi-video.mp4
```

Genera `mi-video-norm.mp4` a 30 fps constantes con keyframes regulares. **Ese es el archivo
que se usa a partir de aquí**, en `videoSrc` y en la transcripción.

Si ves ese error durante el render, es que te saltaste este paso.

## Paso 2 — Instalar Whisper (solo la primera vez)

```powershell
cd "c:\Users\erapi\Downloads\Agencia de videos\remotion-app"
npx tsx scripts/instalar-whisper.mts
```

Modelo por defecto: `small` (~500 MB), buen equilibrio en español.
`medium` transcribe español bastante mejor pero ocupa ~1,5 GB — **comprobar espacio libre en C: antes**, que va justo.

**Se instala en `~/.whisper-cpp`, fuera del proyecto, y es a propósito.** La ruta del proyecto
contiene espacios ("Agencia de videos") y `@remotion/install-whisper-cpp` construye el comando de
descompresión sin comillas, así que ahí falla siempre con
`Expand-Archive : No se encuentra ningún parámetro de posición...`.
No lo muevas dentro del proyecto. Para otra ubicación, usa la variable `WHISPER_DIR`
(también sin espacios).

## Paso 3 — Transcribir

```powershell
npx tsx scripts/transcribir.mts public/grabaciones/mi-video-norm.mp4
```

Genera `remotion-app/public/subtitulos/mi-video.json` con timing por palabra.

Revisa la transcripción antes de seguir: nombres propios y tecnicismos (Kommo, n8n) suelen salir mal. Corrígelos en el JSON — es texto plano.

## Paso 4 — Colocar las capturas

Por cada `[CAPTURA: descripción]` del guion:
1. Busca en la transcripción la frase inmediatamente anterior a la marca
2. Ese timestamp es cuando entra la captura
3. Duración por defecto: 3 s, o hasta la siguiente marca

Presenta al usuario la tabla propuesta (segundo → captura) **y espera su OK** antes de renderizar. Es el punto donde más se equivoca la automatización.

## Paso 5 — Renderizar

```powershell
npx remotion render VideoVertical ../salida/NNNN-slug.mp4 --props="./props/NNNN-slug.json"
```

El archivo de props lleva ruta del vídeo, subtítulos y capturas con sus tiempos.

## Paso 6 — Verificación objetiva

Comprueba con ffprobe y repórtaselo:

```powershell
ffprobe -v error -show_entries format=duration,size -show_entries stream=codec_name,width,height -of default=noprint_wrappers=1 "../salida/NNNN-slug.mp4"
```

- ✅ Resolución 1080x1920, duración parecida a la esperada, audio presente
- ✅ Extrae 3-4 fotogramas y míralos: subtítulos legibles, capturas en su sitio, nada tapado
- ❌ **No dictamines si el vídeo "está bien" en sentido creativo.** Ritmo, energía, si engancha — eso lo juzga él. Di lo que verificaste y lo que no.

## Reglas
- Nunca sobreescribas la grabación original.
- Subtítulos: alto contraste, en el tercio central-bajo, fuera de la zona de la UI de TikTok (evita el 15% inferior y el 10% superior).
- Si un render falla, enseña el error real de Remotion, no lo resumas.
- Vigila el espacio en C: antes de renders largos.
