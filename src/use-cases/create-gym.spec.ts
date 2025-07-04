import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym";

let gymsRepository: InMemoryGymRepository;
let sut: CreateGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("should be able to create gym", async () => {
    // eslint-disable-next-line new-cap

    const { gym } = await sut.execute({
      title: "Javascript gym",
      description: null,
      phone: null,
      latitude: -23.7174784,
      longitude: -46.8877312,
    });
    expect(gym.id).toEqual(expect.any(String));
  });
});
