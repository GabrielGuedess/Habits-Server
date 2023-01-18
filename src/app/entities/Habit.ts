export interface HabitProps {
  id?: string;
  title: string;
  weekDays: number[];
  createdAt?: Date;
}

export class Habit {
  private props: HabitProps;

  constructor(props: HabitProps) {
    this.props = props;
  }

  public set title(title: string) {
    this.props.title = title;
  }

  public get title(): string {
    return this.props.title;
  }

  public set weekDays(weekDays: number[]) {
    this.props.weekDays = weekDays;
  }

  public get weekDays(): number[] {
    return this.props.weekDays;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get id(): string {
    return this.props.id;
  }
}
