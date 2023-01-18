import { Habit } from 'app/entities/Habit';

export class HabitViewModel {
  static toHTTP(habit: Habit) {
    return {
      id: habit.id,
      title: habit.title,
      createdAt: habit.createdAt,
    };
  }
}
