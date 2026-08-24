/**
 * Entrada de renderizado en servidor. Solo la usa el prerenderizado del build.
 *
 * Existe porque los rastreadores de IA no ejecutan JavaScript: sin esto, el HTML
 * que se publica es un `<div id="root"></div>` vacío y ChatGPT no ve ni una
 * palabra de la página.
 *
 * No hace falta navegador. `renderToStaticMarkup` NO ejecuta los `useEffect`, y
 * todo el acceso a `window` de esta app vive dentro de effects, así que el árbol
 * se renderiza tal cual en Node. Las animaciones de scroll siguen siendo cosa
 * del navegador, como antes.
 */
import { renderToStaticMarkup } from "react-dom/server";
import App from "./App";

export function render(): string {
  return renderToStaticMarkup(<App />);
}
