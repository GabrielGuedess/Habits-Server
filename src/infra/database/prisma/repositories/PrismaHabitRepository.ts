import { Injectable } from '@nestjs/common';

import * as dayjs from 'dayjs';

import { Habit } from 'app/entities/Habit';
import { HabitRepository } from 'app/repositories/HabitRepository';

import { PrismaHabitMapper } from '../mappers/prismaHabitMapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaHabitRepository implements HabitRepository {
  constructor(private prisma: PrismaService) {}

  async findCompleted(date: Date): Promise<string[]> {
    const day = await this.prisma.day.findUnique({
      where: {
        date: new Date(date),
      },
      include: {
        dayHabits: true,
      },
    });

    return day?.dayHabits.map(dayHabit => dayHabit.habit_id);
  }

  async findDay(date: Date): Promise<Habit[]> {
    const weekDay = dayjs(date).get('day');

    const habits = await this.prisma.habit.findMany({
      include: {
        weekDays: true,
      },
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay,
          },
        },
      },
    });

    return habits.map(PrismaHabitMapper.toDomain);
  }

  async create({ title, weekDays }: Habit): Promise<void> {
    const today = dayjs().startOf('day').toDate();

    await this.prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map(weekDay => ({
            week_day: weekDay,
          })),
        },
      },
    });
  }
}
