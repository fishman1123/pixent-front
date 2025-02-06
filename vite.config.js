// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    svgr({
      // Example config
      svgoConfig: {
        plugins: [
          // This removes hard-coded fill or stroke attributes
          { removeAttrs: { attrs: "(fill|stroke)" } },
        ],
      },
    }),
    react(),
  ],
});
