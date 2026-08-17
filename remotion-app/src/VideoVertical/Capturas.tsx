import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { z } from "zod";
import type { capturaSchema } from "./index";

type Captura = z.infer<typeof capturaSchema>;

const DURACION_ENTRADA = 12; // frames

export const Capturas: React.FC<{ capturas: Captura[] }> = ({ capturas }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <>
      {capturas.map((captura, i) => {
        const inicio = Math.round(captura.desdeSegundo * fps);
        const fin = inicio + Math.round(captura.duracionSegundos * fps);

        if (frame < inicio || frame >= fin) return null;

        const local = frame - inicio;

        const entrada = spring({
          frame: local,
          fps,
          config: { damping: 200 },
          durationInFrames: DURACION_ENTRADA,
        });

        // Se desvanece en los últimos 8 frames
        const salida = interpolate(
          frame,
          [fin - 8, fin],
          [1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        return (
          <AbsoluteFill
            key={`${captura.src}-${i}`}
            style={{
              justifyContent: "center",
              alignItems: "center",
              // Zona superior-central: no pisa los subtítulos
              paddingBottom: "30%",
              paddingLeft: 60,
              paddingRight: 60,
              opacity: salida,
            }}
          >
            <Img
              src={staticFile(captura.src)}
              style={{
                width: "100%",
                maxHeight: "45%",
                objectFit: "contain",
                borderRadius: 28,
                border: "4px solid rgba(255,255,255,0.9)",
                boxShadow: "0 24px 70px rgba(0,0,0,0.6)",
                transform: `scale(${interpolate(entrada, [0, 1], [0.85, 1])})`,
              }}
            />
          </AbsoluteFill>
        );
      })}
    </>
  );
};
