import { defineConfig } from "vite";
import path from "path"; // Импортируем весь модуль path

export default defineConfig({
  base: "./",
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: ``,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@js": path.resolve(__dirname, "src/js"),
    },
  },
});
