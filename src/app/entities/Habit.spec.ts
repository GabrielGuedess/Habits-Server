import { Habit } from './Habit';

describe('Habit', () => {
  it('should be able to create a habit', () => {
    const habit = new Habit({
      title: 'Beber 2L de água',
      weekDays: [1, 2],
    });

    expect(habit).toBeTruthy();
  });
});
