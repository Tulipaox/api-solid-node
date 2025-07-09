import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { ValidateCheckinUseCase } from "../validate-check-in";

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const usecase = new ValidateCheckinUseCase(checkInsRepository);
  return usecase;
}
