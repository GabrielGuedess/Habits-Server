import { Injectable } from '@nestjs/common';

import * as dayjs from 'dayjs';

import { SummaryDTO } from 'app/dtos/SummaryDTO';
import { Habit } from 'app/entities/Habit';
import { HabitRepository } from 'app/repositories/HabitRepository';

import { PrismaHabitMapper } from '../mappers/prismaHabitMapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaHabitRepository implements HabitRepository {
  constructor(private prisma: PrismaService) {}

  async summary(): Promise<SummaryDTO> {
    const summary: SummaryDTO = await this.prisma.$queryRaw`
      SELECT
        D.id,
        D.date,
        (
          SELECT
            cast(count(*) as float)
          FROM day_habits DH
          WHERE DH.day_id = D.id
        ) as completed,
        (
          SELECT
            cast(count(*) as float)
          FROM habit_week_days HWD
          JOIN habits H
            ON H.id = HWD.habit_id
          WHERE
            HWD.week_day = cast(extract(dow from D.date) as int)
            AND H.created_at <= D.date
        ) as amount
      FROM days D
    `;

    return summary;
  }

  async findCompleted(date: Date): Promise<string[]> {
    const day = await this.prisma.day.findUnique({
      where: {
        date,
      },
      include: {
        dayHabits: true,
      },
    });

    console.log(day);

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

  async toggledCompleted(id: string): Promise<void> {
    const today = dayjs().startOf('day').toDate();

    let day = await this.prisma.day.findUnique({
      where: {
        date: today,
      },
    });

    if (!day) {
      day = await this.prisma.day.create({
        data: {
          date: today,
        },
      });
    }

    const dayHabit = await this.prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id,
        },
      },
    });

    if (dayHabit) {
      await this.prisma.dayHabit.delete({
        where: {
          id: dayHabit.id,
        },
      });
    } else {
      await this.prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id,
        },
      });
    }
  }
}
