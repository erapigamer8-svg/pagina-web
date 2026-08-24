---
tags: [recurso, referencia]
estado: Funcionando
etapa: no aplica
id: no aplica
audiencia: no aplica
actualizado: 2026-08-23
---

# Recurso — Plantilla de referencia

**Dónde:** `contenido/referencias/_PLANTILLA.md`
**Cómo se usa:** copiar, renombrar y rellenar. Pueden ir varias referencias en el mismo archivo.

Es el formulario de entrada de las referencias ajenas. Lo que se rellena aquí es lo que luego
lee `/ideas-contenido` para sacar patrones.

## Qué pide, por cada referencia

- Enlace
- Plataforma (TikTok / Reels / Shorts)
- **Visitas**
- **Seguidores de la cuenta**
- Fecha aproximada
- **Hook exacto**, lo que dice en los primeros 3 segundos
- De qué va el vídeo, en 2 líneas
- Qué te llamó la atención

## Por qué pide exactamente eso

**Visitas y seguidores** son los dos que deciden. El ratio entre ambos es lo único que distingue
un formato ganador de una cuenta grande.

**El hook exacto, transcrito literalmente**, es el dato más valioso del archivo. Es la parte que
decide si el vídeo funciona, y la que el agente estudia para sacar los míos.

**Qué te llamó la atención**: mi intuición suele señalar lo correcto, aunque no sepa explicar por qué.

Desarrollado en [[Cómo elegir una referencia]].

## Los agentes no pueden ver vídeos

Dejar un `.mp4` en la carpeta **no sirve de nada**: nadie puede mirarlo. Hacen falta los datos y
el texto. Si algo visual importa, captura de pantalla junto al archivo.

## El atajo

Desde `remotion-app/`:

```powershell
npx tsx scripts/transcribir-referencia.mts "C:\ruta\al\video.mp4" "nombre-corto"
```

Te crea el archivo montado, con el hook separado y la transcripción debajo. Solo quedan visitas
y seguidores. Ver [[Recurso — Scripts de Whisper y FFmpeg]].

## Estado hoy

Ocho referencias rellenadas: `ref-01.md` … `ref-08.md`.
**Ninguna de las ocho tiene seguidores de la cuenta**, y cinco tampoco tienen visitas.
El campo que más importa está vacío en las ocho. Ver [[Índice — Referencias]].

Si a la novena le pongo esos dos números, será la primera que valga entera.

## Su equivalente en el vault

[[Template — Referencia]]. La plantilla de `contenido/` recoge los datos crudos.
El template del vault guarda el análisis.

Relacionadas: [[Índice — Recursos]] · [[Índice — Referencias]]
