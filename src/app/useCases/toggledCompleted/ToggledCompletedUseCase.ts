import { Injectable } from '@nestjs/common';

import { HabitRepository } from 'app/repositories/HabitRepository';

interface ToggledCompletedRequest {
  id: string;
}

@Injectable()
export class ToggledCompletedUseCase {
  constructor(private habitRepository: HabitRepository) {}

  async execute(request: ToggledCompletedRequest) {
    const { id } = request;

    await this.habitRepository.toggledCompleted(id);
  }
}
