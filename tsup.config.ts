import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts", "!src/**/*.spec.ts", "!src/**/__tests__/**"],
  outDir: "build",
  format: ["cjs"],
  dts: false,
  clean: true,
});
