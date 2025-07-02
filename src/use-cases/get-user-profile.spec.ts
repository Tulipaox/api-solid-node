import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFoundError } from "./erros/resource-not-found-error";

let usersRepository: InMemoryUsersRepository;
let stu: GetUserProfileUseCase;

describe("Get Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    stu = new GetUserProfileUseCase(usersRepository);
  });

  it("should be able to get user profile", async () => {
    const createUser = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await stu.execute({
      userId: createUser.id,
    });
    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("John Doe");
  });

  it("should not be able get user profile with wrong id", async () => {
    await expect(() =>
      stu.execute({
        userId: "non-existing-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
