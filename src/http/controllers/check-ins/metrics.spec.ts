import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "../../../lib/prisma";

describe("Check In Metrics (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get the total count of check-ins", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data: {
        title: "JavaScript Gym",
        latitude: -23.7174784,
        longitude: -46.8877312,
      },
    });

    await prisma.checkIn.createMany({
      data: [
        {
          gym_Id: gym.id,
          user_id: user.id,
        },
        {
          gym_Id: gym.id,
          user_id: user.id,
        },
      ],
    });

    const response = await request(app.server)
      .get("/check-ins/metrics")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.checkInsCounter).toEqual(2);
  });
});
