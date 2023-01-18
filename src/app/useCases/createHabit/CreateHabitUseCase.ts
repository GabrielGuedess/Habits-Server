import { Injectable } from '@nestjs/common';

import { Habit } from 'app/entities/Habit';
import { HabitRepository } from 'app/repositories/HabitRepository';

interface CreateHabitUseCaseRequest {
  title: string;
  weekDays: number[];
}

@Injectable()
export class CreateHabitUseCase {
  constructor(private habitRepository: HabitRepository) {}

  async execute(request: CreateHabitUseCaseRequest): Promise<void> {
    const { title, weekDays } = request;

    const habit = new Habit({ title, weekDays });

    await this.habitRepository.create(habit);
  }
}
