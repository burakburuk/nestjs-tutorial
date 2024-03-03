import { TaskPriority } from '../entities/task.entity';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsEnum(TaskPriority)
  @IsNotEmpty()
  priority: TaskPriority;

  @IsString()
  @IsNotEmpty()
  content: string;
}
