import { Module } from '@nestjs/common';

import { CreateHabitUseCase } from 'app/useCases/createHabit/CreateHabitUseCase';
import { FindCompletedUseCase } from 'app/useCases/findCompleted/FindCompletedUseCase';
import { FindDayUseCase } from 'app/useCases/findDay/FindDayUseCase';

import { DatabaseModule } from 'infra/database/database.module';

import { HabitController } from './controllers/habit.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [HabitController],
  providers: [CreateHabitUseCase, FindDayUseCase, FindCompletedUseCase],
})
export class HttpModule {}
