import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { z } from "zod";
import { Subtitulos } from "./Subtitulos";
import { Capturas } from "./Capturas";

export const capturaSchema = z.object({
  /** Ruta dentro de public/, ej: "capturas/kommo-pipeline.png" */
  src: z.string(),
  /** Segundo en el que entra */
  desdeSegundo: z.number(),
  /** Cuánto se queda en pantalla */
  duracionSegundos: z.number().default(3),
});

export const videoVerticalSchema = z.object({
  /** Ruta dentro de public/, ej: "grabaciones/mi-video.mp4" */
  videoSrc: z.string(),
  /** Ruta dentro de public/, ej: "subtitulos/mi-video.json" */
  subtitulosSrc: z.string().nullable().default(null),
  capturas: z.array(capturaSchema).default([]),
  /** Palabras por bloque de subtítulo */
  msPorBloque: z.number().default(1200),
});

export type VideoVerticalProps = z.infer<typeof videoVerticalSchema>;

export const VideoVertical: React.FC<VideoVerticalProps> = ({
  videoSrc,
  subtitulosSrc,
  capturas,
  msPorBloque,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <AbsoluteFill>
        <OffthreadVideo
          src={staticFile(videoSrc)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>

      <Capturas capturas={capturas} />

      {subtitulosSrc ? (
        <Subtitulos src={subtitulosSrc} msPorBloque={msPorBloque} />
      ) : null}
    </AbsoluteFill>
  );
};
