import { Injectable } from '@nestjs/common';

import { Habit } from 'app/entities/Habit';
import { HabitRepository } from 'app/repositories/HabitRepository';

interface FindDayUseCaseRequest {
  date: Date;
}

interface FindDayUseCaseResponse {
  habits: Habit[];
}

@Injectable()
export class FindDayUseCase {
  constructor(private habitRepository: HabitRepository) {}

  async execute(
    request: FindDayUseCaseRequest,
  ): Promise<FindDayUseCaseResponse> {
    const { date } = request;

    const habits = await this.habitRepository.findDay(date);

    return {
      habits,
    };
  }
}
