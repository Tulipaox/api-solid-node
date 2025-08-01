import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { ResourceNotFoundError } from "./erros/resource-not-found-error";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "./erros/late-check-in-validation-error";

interface ValidateCheckinUseCaseRequest {
  checkInId: string;
}

interface ValidateCheckinUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckinUseCase {
  constructor(private checkInsRespository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckinUseCaseRequest): Promise<ValidateCheckinUseCaseResponse> {
    const checkIn = await this.checkInsRespository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes",
    );

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRespository.save(checkIn);
    return {
      checkIn,
    };
  }
}
