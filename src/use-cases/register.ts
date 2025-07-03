import { UsersRepository } from "@/repositories/prisma/users.repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./erros/user.already-exist-error";
import { User } from "@prisma/client";

interface registerUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegiserUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: registerUseCaseRequest): Promise<RegiserUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return {
      user,
    };
  }
}
