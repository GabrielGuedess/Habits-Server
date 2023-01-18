import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { CreateHabitUseCase } from 'app/useCases/createHabit/CreateHabitUseCase';
import { FindCompletedUseCase } from 'app/useCases/findCompleted/FindCompletedUseCase';
import { FindDayUseCase } from 'app/useCases/findDay/FindDayUseCase';

import { CreateHabitDTO } from '../dtos/CreateHabitDTO';
import { HabitViewModel } from '../viewModels/habitViewModel';

@Controller('habits')
export class HabitController {
  constructor(
    private createHabitUseCase: CreateHabitUseCase,
    private findDayUseCase: FindDayUseCase,
    private findCompletedUseCase: FindCompletedUseCase,
  ) {}

  @Get('day')
  async findDay(@Query('date') query: string) {
    const { habits } = await this.findDayUseCase.execute({
      date: new Date(query),
    });

    const { completed } = await this.findCompletedUseCase.execute({
      date: new Date(query),
    });

    return {
      habits: habits.map(HabitViewModel.toHTTP),
      completed,
    };
  }

  @Post()
  async createHabit(@Body() body: CreateHabitDTO) {
    const { title, weekDays } = body;

    await this.createHabitUseCase.execute({ title, weekDays });
  }
}
