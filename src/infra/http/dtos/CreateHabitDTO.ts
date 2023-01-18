import { IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';

export abstract class CreateHabitDTO {
  @IsNotEmpty()
  title: string;

  @IsArray()
  @ArrayNotEmpty()
  weekDays: number[];
}
