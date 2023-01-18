import { Injectable } from '@nestjs/common';

import { HabitRepository } from 'app/repositories/HabitRepository';

interface FindCompletedUseCaseRequest {
  date: Date;
}

interface FindCompletedUseCaseResponse {
  completed: string[];
}

@Injectable()
export class FindCompletedUseCase {
  constructor(private habitRepository: HabitRepository) {}

  async execute(
    request: FindCompletedUseCaseRequest,
  ): Promise<FindCompletedUseCaseResponse> {
    const { date } = request;

    const completed = await this.habitRepository.findCompleted(date);

    return {
      completed,
    };
  }
}
