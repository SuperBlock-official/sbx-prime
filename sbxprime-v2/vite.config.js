import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3005,
    // Forward API calls to the Node backend during development.
    proxy: {
      "/api": {
        target: process.env.VITE_API_PROXY || "http://localhost:4000",
        changeOrigin: true,
      },
      "/uploads": {
        target: process.env.VITE_API_PROXY || "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});
