import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { Todos } from './todos.entity';

@Injectable()
export class TodosService {
  constructor(
  @InjectRepository(Todos)
  // eslint-disable-next-line no-unused-vars
  private todoRepository: Repository<Todos>,
  @InjectRepository(Users)
  // eslint-disable-next-line no-unused-vars
  private usersRepository: Repository<Users>,
  ) {}

  public create(todo: Todos): Promise<Todos> {
    const newTodo = new Todos();
    newTodo.title = todo.title;
    return this.todoRepository.manager.save(newTodo);
  }

  public findAll(): Promise<Todos[]> {
    return this.todoRepository.find();
  }

  public findOne(id: string): Promise<Todos> {
    return this.todoRepository.findOneBy({ id });
  }

  public async findAssignee(id: string): Promise<Users> {
    return (await this.todoRepository.findOne({
      relations: {
        user: true
      },
      where: {
        id
      }
    })).user;
  }

  public async updateOne(id: string, todo: Todos): Promise<Todos> {
    const updatedTodo = await this.todoRepository.findOneBy({ id });
    updatedTodo.title = todo.title;
    return this.todoRepository.save(updatedTodo);
  }

  public async assignTodo(id: string, userId: string): Promise<Todos> {
    const updatedTodo = await this.todoRepository.findOneBy({ id });
    const user = await this.usersRepository.findOneBy({ id: userId });
    updatedTodo.user = user;

    return this.todoRepository.save(updatedTodo);
  }

  public async delete(id: string): Promise<Todos> {
    const deletedTodo = this.todoRepository.findOneBy({ id });
    await this.todoRepository.delete({ id });
    return deletedTodo;
  }
}
