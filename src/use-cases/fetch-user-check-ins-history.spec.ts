import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { FetchUserCheckInsHostoryUseCase } from "./fetch-user-check-ins-history";

let checkInsRespository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInsHostoryUseCase;

describe("Fetch Check-in History Use Case", () => {
  beforeEach(async () => {
    checkInsRespository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInsHostoryUseCase(checkInsRespository);
  });

  it("should be able to fetch check-ins history", async () => {
    await checkInsRespository.create({
      gym_Id: "gym-01",
      user_id: "user-01",
    });

    await checkInsRespository.create({
      gym_Id: "gym-02",
      user_id: "user-01",
    });

    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_Id: "gym-01" }),
      expect.objectContaining({ gym_Id: "gym-02" }),
    ]);
  });

  it("should be able to fetch paginated check-in history", async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRespository.create({
        gym_Id: `gym-${i}`,
        user_id: "user-01",
      });
    }
    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_Id: "gym-21" }),
      expect.objectContaining({ gym_Id: "gym-22" }),
    ]);
  });
});
