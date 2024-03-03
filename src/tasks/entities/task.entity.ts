import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TaskPriority {
  Low = 1,
  Medium = 2,
  High = 3,
  VeryHigh = 4,
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: TaskPriority })
  priority: TaskPriority;

  @Column({ type: 'boolean', default: false })
  completed: boolean;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text' })
  testCol: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createDate: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updateDate: Date;
}
