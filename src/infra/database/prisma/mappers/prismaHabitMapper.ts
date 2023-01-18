import { HabitWeekDays, Habit as RawHabit } from '@prisma/client';

import { Habit } from 'app/entities/Habit';

import { Replace } from 'helpers/Replace';

export class PrismaHabitMapper {
  static toDomain(
    raw: Replace<RawHabit, { weekDays: HabitWeekDays[] }>,
  ): Habit {
    const habit = new Habit({
      id: raw.id,
      title: raw.title,
      weekDays: raw.weekDays.map(item => item.week_day),
      createdAt: raw.created_at,
    });

    return habit;
  }
}
