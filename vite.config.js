import { defineConfig } from "vite";
import { resolve } from "path";
import autoprefixer from "autoprefixer";

export default defineConfig({
  base: "./", // Критически важно для корректных путей

  css: {
    preprocessorOptions: {
      scss: {
        // Если не используете глобальные переменные, оставьте пустым
        additionalData: ``,
      },
    },
    postcss: {
      plugins: [autoprefixer()],
    },
  },

  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@scss": resolve(__dirname, "src/scss"),
    },
  },

  build: {
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
      },
    },
    minify: "terser", // Добавляем минификацию
  },

  server: {
    port: 3000,
    open: true,
    cors: true, // Включаем CORS для dev-сервера
  },
});
