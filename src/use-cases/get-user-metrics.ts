import { CheckInsRepository } from "@/repositories/prisma/check-ins-repository";

interface GetUserMetricsUseCaseRequest {
  userId: string;
}

interface GetUserMetricsUseCaseResponse {
  checkInsCounter: number;
}

export class GetUserMetricsUseCase {
  constructor(private checkInsRespository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCounter =
      await this.checkInsRespository.countByUserId(userId);

    return {
      checkInsCounter,
    };
  }
}
