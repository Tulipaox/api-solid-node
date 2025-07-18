// @vitest-environment ./vitest-environment-prisma

import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { prisma } from "../../../lib/prisma";

describe("Register (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  it("should be able to register", async () => {
    const response = await request(app.server).post("/users").send({
      name: "John doe",
      email: "johndoe1@exemple.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(201);
  });
});
