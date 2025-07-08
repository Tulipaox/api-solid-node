import { Gym } from "@prisma/client";
import { GymRepository } from "@/repositories/prisma/gyms-repository";

interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbyGymsCaseResponse {
  gyms: Gym[];
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return {
      gyms,
    };
  }
}
