import { Injectable } from '@nestjs/common';

import { HabitRepository } from 'app/repositories/HabitRepository';

@Injectable()
export class SummaryUseCase {
  constructor(private habitRepository: HabitRepository) {}

  async execute() {
    const summary = await this.habitRepository.summary();

    return {
      summary,
    };
  }
}
