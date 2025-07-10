import type { Environment } from "vitest/environments";

export default <Environment>{
  name: "prisma",
  transformMode: "ssr",
  setup() {
    console.log("🟢 Setup PRISMA rodando!");
    return {
      teardown() {
        console.log("🟢 Teardown PRISMA rodando!");
      },
    };
  },
};
