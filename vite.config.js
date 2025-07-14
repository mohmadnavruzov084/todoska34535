import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
