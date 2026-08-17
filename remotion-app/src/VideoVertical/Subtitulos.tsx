import { useEffect, useState } from "react";
import {
  AbsoluteFill,
  continueRender,
  delayRender,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  createTikTokStyleCaptions,
  type Caption,
  type TikTokPage,
} from "@remotion/captions";

// Zonas seguras: la UI de TikTok/Reels tapa el 15% inferior y el 10% superior.
// Los subtítulos van en el tercio central-bajo.
const POSICION_INFERIOR = "22%";

export const Subtitulos: React.FC<{ src: string; msPorBloque: number }> = ({
  src,
  msPorBloque,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [pages, setPages] = useState<TikTokPage[] | null>(null);
  const [handle] = useState(() => delayRender("Cargando subtítulos"));

  useEffect(() => {
    fetch(staticFile(src))
      .then((res) => {
        if (!res.ok) throw new Error(`No se pudo cargar ${src} (${res.status})`);
        return res.json();
      })
      .then((captions: Caption[]) => {
        const { pages: p } = createTikTokStyleCaptions({
          captions,
          combineTokensWithinMilliseconds: msPorBloque,
        });
        setPages(p);
        continueRender(handle);
      })
      .catch((err) => {
        console.error(err);
        continueRender(handle);
      });
  }, [src, msPorBloque, handle]);

  if (!pages) return null;

  const msActual = (frame / fps) * 1000;
  const activa = pages.find(
    (p) => msActual >= p.startMs && msActual < p.startMs + p.durationMs,
  );

  if (!activa) return null;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: POSICION_INFERIOR,
        paddingLeft: 80,
        paddingRight: 80,
      }}
    >
      <div
        style={{
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          fontWeight: 800,
          fontSize: 76,
          lineHeight: 1.15,
          color: "#fff",
          textAlign: "center",
          textTransform: "uppercase",
          // Contorno grueso: legible sobre cualquier fondo
          WebkitTextStroke: "10px #000",
          paintOrder: "stroke fill",
          textShadow: "0 6px 24px rgba(0,0,0,0.55)",
        }}
      >
        {activa.text}
      </div>
    </AbsoluteFill>
  );
};
