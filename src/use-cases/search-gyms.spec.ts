import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "./search-gyms";

let gymsRepository: InMemoryGymRepository;
let sut: SearchGymsUseCase;

describe("Fetch Check-in History Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "JavaScript Gym",
      description: null,
      phone: null,
      latitude: -23.7174784,
      longitude: -46.8877312,
    });

    await gymsRepository.create({
      title: "TypeScript Gym",
      description: null,
      phone: null,
      latitude: -23.7174784,
      longitude: -46.8877312,
    });

    const { gyms } = await sut.execute({
      query: "JavaScript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym" }),
    ]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -23.7174784,
        longitude: -46.8877312,
      });
    }
    const { gyms } = await sut.execute({
      query: "JavaScript",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: `JavaScript Gym 21` }),
      expect.objectContaining({ title: `JavaScript Gym 22` }),
    ]);
  });
});
