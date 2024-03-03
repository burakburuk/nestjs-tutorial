import { Injectable, Logger } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    this.logger.log('Fetching all tasks');
    return this.tasksRepository.find();
  }

  create(createTaskDto: CreateTaskDto) {
    this.logger.log('Creating a new task');
    const task: Task = new Task();
    task.priority = createTaskDto.priority;
    task.content = createTaskDto.content;
    return this.tasksRepository.save(task);
  }

  findOne(id: number) {
    return this.tasksRepository.findOne({ where: { id } });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.tasksRepository.update(id, updateTaskDto);
  }

  remove(id: number) {
    return this.tasksRepository.delete(id);
  }
}
