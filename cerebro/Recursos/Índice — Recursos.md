---
tags: [recurso, sistema]
estado: Activo
etapa: no aplica
id: no aplica
audiencia: no aplica
actualizado: 2026-08-23
---

# Índice — Recursos

Piezas reutilizables que **existen hoy**. Nada aspiracional: si no está montado, no está aquí.

| Recurso | Dónde | Estado | Para qué |
|---|---|---|---|
| [[Recurso — Proyecto Remotion]] | `remotion-app/` | Funcionando, render verificado | Montar el vídeo final en vertical |
| [[Recurso — Scripts de Whisper y FFmpeg]] | `remotion-app/scripts/` | Funcionando | Normalizar, transcribir, subtitular |
| [[Recurso — Plantilla de referencia]] | `contenido/referencias/_PLANTILLA.md` | En uso, 8 rellenadas | Entrada de referencias ajenas |
| [[Recurso — Banda de pruebas de la landing]] | `landing/` → eraps-project.vercel.app | Publicada | El material propio que puedo enseñar |

## Cómo se reparten el trabajo

```
Referencias ajenas   →  Plantilla de referencia  →  /ideas-contenido
Material propio      →  Banda de pruebas         →  las capturas de mis vídeos
Grabación mía        →  Scripts (normalizar/transcribir)  →  Proyecto Remotion  →  salida/
```

Los dos primeros son **entrada**: material que viene de fuera de mí o de trabajo ya hecho.
Los dos últimos son **producción**: lo que convierte una grabación en un vídeo publicable.

## Lo que NO está aquí, y por qué

- **Lead magnets:** `lead-magnets/` está vacía. Cero hechos. Cuando exista el primero, entra.
- **Branding:** colores, tipografía y logo sin definir. `[PENDIENTE]`
- **Precios:** sin definir. No inventar cifras en el contenido. `[PENDIENTE]`
- **Los renders de `salida/`:** `ejemplo-test.mp4` y `prueba-vertical.mp4` son pruebas técnicas,
  no contenido y no recursos.

## Para añadir uno

[[Template — Recurso reutilizable]]. Nombre: `Recurso — Título corto.md`.
Solo si existe de verdad y lo puedo abrir hoy.

Relacionadas: [[Cómo uso Obsidian con este vault]] · [[Cómo se coordinan los agentes]]
