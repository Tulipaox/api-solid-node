import { expect, describe, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "./erros/user.already-exist-error";
import { inMemoryUsersRepository } from "@/repositories/in-memory/in-memory-user-repository";

describe("register Use Case", () => {
  it("should be able to register", async () => {
    // eslint-disable-next-line new-cap
    const usersRepository = new inMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });
    expect(user.id).toEqual(expect.any(String));
  });

  it("should has user password upon registration", async () => {
    // eslint-disable-next-line new-cap
    const usersRepository = new inMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    // eslint-disable-next-line new-cap
    const usersRepository = new inMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const email = "jonhdoe@email.com";

    await registerUseCase.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    await expect(() =>
      registerUseCase.execute({
        name: "John Doe",
        email,
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
