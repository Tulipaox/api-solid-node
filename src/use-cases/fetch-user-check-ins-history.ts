import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface FetchUserCheckInsHostoryUseCaseRequest {
  userId: string;
  page: number;
}

interface FetchUserCheckInsHostoryUseCaseResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckInsHostoryUseCase {
  constructor(private checkInsRespository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHostoryUseCaseRequest): Promise<FetchUserCheckInsHostoryUseCaseResponse> {
    const checkIns = await this.checkInsRespository.findManyByUserId(
      userId,
      page,
    );

    return {
      checkIns,
    };
  }
}
