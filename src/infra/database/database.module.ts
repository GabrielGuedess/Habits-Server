import { Module } from '@nestjs/common';

import { HabitRepository } from 'app/repositories/HabitRepository';

import { PrismaService } from './prisma/prisma.service';
import { PrismaHabitRepository } from './prisma/repositories/PrismaHabitRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: HabitRepository,
      useClass: PrismaHabitRepository,
    },
  ],
  exports: [HabitRepository],
})
export class DatabaseModule {}
