import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { GetUserMetricsUseCase } from "./get-user-metrics";

let checkInsRespository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe("Get User Metrics Use Case", () => {
  beforeEach(async () => {
    checkInsRespository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInsRespository);
  });

  it("should be able to get check-ins count from metrics", async () => {
    await checkInsRespository.create({
      gym_Id: "gym-01",
      user_id: "user-01",
    });

    await checkInsRespository.create({
      gym_Id: "gym-02",
      user_id: "user-01",
    });

    const { checkInsCounter } = await sut.execute({
      userId: "user-01",
    });

    expect(checkInsCounter).toEqual(2);
  });
});
