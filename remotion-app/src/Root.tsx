import "./index.css";
import { Composition, staticFile } from "remotion";
import { parseMedia } from "@remotion/media-parser";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import {
  VideoVertical,
  videoVerticalSchema,
  type VideoVerticalProps,
} from "./VideoVertical";

const FPS = 30;

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        // You can take the "id" to render a video:
        // npx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />

      {/* Mount any React component to make it show up in the sidebar and work on it individually! */}
      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />

      {/* Vídeo vertical para TikTok / Reels / Shorts.
          La duración se calcula sola a partir de la grabación. */}
      <Composition
        id="VideoVertical"
        component={VideoVertical}
        durationInFrames={30 * FPS}
        fps={FPS}
        width={1080}
        height={1920}
        schema={videoVerticalSchema}
        defaultProps={
          {
            videoSrc: "grabaciones/ejemplo.mp4",
            subtitulosSrc: null,
            capturas: [],
            msPorBloque: 1200,
          } satisfies VideoVerticalProps
        }
        calculateMetadata={async ({ props }) => {
          try {
            const { slowDurationInSeconds } = await parseMedia({
              src: staticFile(props.videoSrc),
              fields: { slowDurationInSeconds: true },
              acknowledgeRemotionLicense: true,
            });
            return {
              durationInFrames: Math.max(
                1,
                Math.round(slowDurationInSeconds * FPS),
              ),
            };
          } catch {
            // Sin grabación todavía: se queda con la duración por defecto
            return {};
          }
        }}
      />
    </>
  );
};
