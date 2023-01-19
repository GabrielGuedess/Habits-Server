import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import * as dayjs from 'dayjs';

import { CreateHabitUseCase } from 'app/useCases/createHabit/CreateHabitUseCase';
import { FindCompletedUseCase } from 'app/useCases/findCompleted/FindCompletedUseCase';
import { FindDayUseCase } from 'app/useCases/findDay/FindDayUseCase';
import { SummaryUseCase } from 'app/useCases/summary/SummaryUseCase';
import { ToggledCompletedUseCase } from 'app/useCases/toggledCompleted/ToggledCompletedUseCase';

import { CreateHabitDTO } from '../dtos/CreateHabitDTO';
import { HabitViewModel } from '../viewModels/habitViewModel';

@Controller('habits')
export class HabitController {
  constructor(
    private createHabitUseCase: CreateHabitUseCase,
    private findDayUseCase: FindDayUseCase,
    private findCompletedUseCase: FindCompletedUseCase,
    private toggledCompletedUseCase: ToggledCompletedUseCase,
    private summaryUseCase: SummaryUseCase,
  ) {}

  @Get('day')
  async findDay(@Query('date') query: string) {
    const date = dayjs(query).startOf('day').toDate();

    const { habits } = await this.findDayUseCase.execute({ date });

    const { completed } = await this.findCompletedUseCase.execute({ date });

    return {
      habits: habits.map(HabitViewModel.toHTTP),
      completed,
    };
  }

  @Get('summary')
  async getSummary() {
    const { summary } = await this.summaryUseCase.execute();

    return summary;
  }

  @Post()
  async createHabit(@Body() body: CreateHabitDTO) {
    const { title, weekDays } = body;

    await this.createHabitUseCase.execute({ title, weekDays });
  }

  @Patch(':id/toggle')
  async toggledCompleted(@Param() params) {
    const { id } = params;

    await this.toggledCompletedUseCase.execute({ id });
  }
}
