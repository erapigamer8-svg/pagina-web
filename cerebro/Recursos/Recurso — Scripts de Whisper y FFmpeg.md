---
tags: [recurso, video]
estado: Funcionando
etapa: no aplica
id: no aplica
audiencia: no aplica
actualizado: 2026-08-23
---

# Recurso — Scripts de Whisper y FFmpeg

**Dónde:** `remotion-app/scripts/`
Se lanzan desde `remotion-app/`, con `npx tsx`.

## Los seis scripts

| Script | Para qué |
|---|---|
| `normalizar.mts` | Pasa una grabación a 30 fps constantes. **Obligatorio siempre** |
| `transcribir.mts` | Whisper local sobre la grabación normalizada. Deja timing por palabra |
| `transcribir-referencia.mts` | Saca hook y transcripción de un vídeo de referencia |
| `instalar-whisper.mts` | Instala Whisper. Solo la primera vez |
| `whisper-config.mts` | Configuración de Whisper |
| `ffmpeg-bin.mts` | Resuelve el binario de FFmpeg |

## 1. Normalizar — no es opcional

Los móviles graban con **frame rate variable**. Remotion falla con
`No frame found at position ...` al renderizarlos.

```powershell
cd "c:\Users\erapi\Downloads\Agencia de videos\remotion-app"
npx tsx scripts/normalizar.mts public/grabaciones/mi-video.mp4
```

Genera `mi-video-norm.mp4`. **Ese es el archivo que se usa a partir de ahí**, en `videoSrc`
y en la transcripción. Si ves ese error durante el render, es que te saltaste este paso.

## 2. Instalar Whisper — una sola vez

```powershell
npx tsx scripts/instalar-whisper.mts
```

Modelo por defecto: `small` (~500 MB), buen equilibrio en español.
`medium` transcribe español bastante mejor pero ocupa ~1,5 GB. **Comprobar espacio en C: antes**,
que va justo.

**Se instala en `~/.whisper-cpp`, fuera del proyecto, y es a propósito.**
La ruta del proyecto tiene espacios ("Agencia de videos") y `@remotion/install-whisper-cpp`
construye el comando de descompresión sin comillas, así que ahí falla siempre con
`Expand-Archive : No se encuentra ningún parámetro de posición...`.

**No lo muevas dentro del proyecto.** Para otra ubicación, la variable `WHISPER_DIR`
(también sin espacios).

## 3. Transcribir la grabación

```powershell
npx tsx scripts/transcribir.mts public/grabaciones/mi-video-norm.mp4
```

Genera `remotion-app/public/subtitulos/mi-video.json`.

**Revisar antes de seguir:** los nombres propios y los tecnicismos (Kommo, n8n) suelen salir mal.
Se corrigen en el JSON, que es texto plano. Un subtítulo que escribe "en 8N" en vez de "n8n"
delante de un dueño de negocio no importa; delante de alguien que sabe, sí.

## 4. Transcribir una referencia ajena

```powershell
npx tsx scripts/transcribir-referencia.mts "C:\ruta\al\video.mp4" "nombre-corto"
```

Deja el archivo ya montado en `contenido/referencias/`, con el hook de los primeros 3 segundos
separado y la transcripción completa debajo.

**Solo hay que rellenar visitas y seguidores a mano**, que no están en el audio, y son justo
los dos datos que deciden si esa referencia vale. Ver [[Cómo elegir una referencia]].

## El orden, siempre

```
normalizar → transcribir → colocar capturas → renderizar → verificar
```

Relacionadas: [[Índice — Recursos]] · [[Recurso — Proyecto Remotion]] · [[Recurso — Plantilla de referencia]]
