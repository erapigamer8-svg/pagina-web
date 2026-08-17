import type { Plugin } from "vite";

/**
 * Mete el JS y el CSS dentro del propio index.html.
 *
 * Hace falta porque la página publicada no puede cargar archivos externos:
 * si el HTML apunta a /assets/index.js, ese archivo nunca llega.
 */
export function viteSingleFile(): Plugin {
  return {
    name: "single-file",
    enforce: "post",
    generateBundle(_opciones, bundle) {
      const html = Object.values(bundle).find(
        (a) => a.type === "asset" && a.fileName.endsWith(".html"),
      );
      if (!html || html.type !== "asset") return;

      let codigo = String(html.source);

      for (const [nombre, salida] of Object.entries(bundle)) {
        if (salida.type === "chunk" && nombre.endsWith(".js")) {
          const script = `<script type="module">${salida.code}</script>`;
          codigo = codigo.replace(
            new RegExp(`<script[^>]*src="[^"]*${escapar(nombre)}"[^>]*></script>`, "g"),
            // Función, NO cadena: el JS minificado contiene "$&" y "$\`", y como
            // texto de reemplazo JavaScript los expandiría y corrompería el código.
            () => script,
          );
          delete bundle[nombre];
        }
        if (salida.type === "asset" && nombre.endsWith(".css")) {
          const estilos = `<style>${salida.source}</style>`;
          codigo = codigo.replace(
            new RegExp(`<link[^>]*href="[^"]*${escapar(nombre)}"[^>]*>`, "g"),
            () => estilos,
          );
          delete bundle[nombre];
        }
      }

      // Sobran los preloads: ya no hay archivos externos que precargar
      codigo = codigo.replace(
        /<link[^>]*rel="(modulepreload|preload)"[^>]*>\s*/g,
        "",
      );

      html.source = codigo;
    },
  };
}

const escapar = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
