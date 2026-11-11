// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // URL pública del sitio: se usa para canonical, og:url y la imagen al compartir.
  // Cuando tengas el dominio propio, cambiá solo esta línea.
  site: "https://porfolio-dev.gabrielhaguero.workers.dev",
  vite: {
    plugins: [tailwindcss()],
  },
});
