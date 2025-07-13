// tests/e2e/user.test.ts

// @vitest-environment prisma

import "dotenv/config";
import { randomUUID } from "node:crypto";
import { execSync } from "node:child_process";
import { resolve, join } from "node:path";
import { existsSync } from "node:fs";
import type { Environment } from "vitest/environments";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Por favor, defina a variável DATABASE_URL.");
  }

  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set("schema", schema);
  return url.toString();
}

export default <Environment>{
  name: "prisma",
  transformMode: "ssr",
  async setup() {
    const schema = randomUUID();
    const databaseURL = generateDatabaseURL(schema);
    process.env.DATABASE_URL = databaseURL;

    const schemaPath = resolve(join(__dirname, "../../prisma/schema.prisma"));

    if (!existsSync(schemaPath)) {
      throw new Error(`Arquivo schema.prisma não encontrado: ${schemaPath}`);
    }

    process.env.PRISMA_SCHEMA_PATH = schemaPath;

    execSync("npx prisma generate", { stdio: "inherit" });
    execSync("npx prisma migrate deploy", { stdio: "inherit" });

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        );
        await prisma.$disconnect();
      },
    };
  },
};
