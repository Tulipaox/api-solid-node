import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    exclude: ["build/**", "node_modules/**"],
    include: ["src/http/controllers/**/*.spec.ts"],
    name: "prisma",
    projects: [
      {
        extends: true,
        test: {
          environment: "prisma",
          exclude: ["prisma/**"],
        },
      },
    ],
  },

  optimizeDeps: {
    exclude: ["prisma"],
  },

  build: {
    rollupOptions: {
      external: ["prisma"],
    },
  },
});
