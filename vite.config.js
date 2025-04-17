import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    laravel({
      input: "resources/js/app.tsx",
      refresh: true,
    }),
    react(),
  ],
  build: {
    chunkSizeWarningLimit: 1600,
  },
  server: {
    host: "0.0.0.0",
    hmr: {
      host: "localhost",
    },
  },
});
