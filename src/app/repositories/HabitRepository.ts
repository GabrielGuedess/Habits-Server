import { Habit } from 'app/entities/Habit';

export abstract class HabitRepository {
  abstract create(habit: Habit): Promise<void>;
  abstract findDay(date: Date): Promise<Habit[]>;
  abstract findCompleted(date: Date): Promise<string[]>;
}
