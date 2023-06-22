// vite.config.js
import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [reactRefresh()],
});
