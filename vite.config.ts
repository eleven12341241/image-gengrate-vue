import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/image": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
