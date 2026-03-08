import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: false })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  server: {
    host: "0.0.0.0",
    proxy: {
      "/books": {
        target: process.env.VITE_APP_SERVER_URL ?? "http://localhost:3000",
        changeOrigin: true
      }
    }
  }
});
