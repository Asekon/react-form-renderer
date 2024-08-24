import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";
import { libInjectCss } from "vite-plugin-lib-inject-css";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "react-form-renderer",
      fileName: (format) => `index.${format}.js`,
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "@testing-library/dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
    cssCodeSplit: true,
  },
  plugins: [react(), dts(), libInjectCss()],
});
