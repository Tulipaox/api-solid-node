// tests/e2e/user.test.ts

// @vitest-environment prisma

import "dotenv/config";
import { randomUUID } from "node:crypto";
import { execSync } from "node:child_process";
import { resolve } from "node:path";
import type { Environment } from "vitest/environments";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provide a DATABASE_URL environment variable.");
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

    const schemaPath = resolve(__dirname, "../../prisma/schema.prisma");

    execSync(`npx prisma migrate deploy --schema=${schemaPath}`);

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
