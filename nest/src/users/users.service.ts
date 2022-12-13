import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todos } from 'src/todos/todos.entity';
import { Repository } from 'typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    // eslint-disable-next-line no-unused-vars
    private userRepository: Repository<Users>,
  ) {}

  public create(user: Users): Promise<Users> {
    return this.userRepository.manager.save(user);
  }

  public findAll(): Promise<Users[]> {
    return this.userRepository.find();
  }

  public findById(id: string): Promise<Users> {
    return this.userRepository.findOneBy({ id });
  }

  public async getTodos(id: string): Promise<Todos[]> {
    const user = await this.userRepository.findOne({
      relations: {
        todos: true,
      },
      where: {
        id
      }
    });
    return user.todos;
  }

  public async updateOne(id: string, user: Users): Promise<Users> {
    const updatedUser = await this.userRepository.findOneBy({ id });
    updatedUser.first_name = user.first_name;
    updatedUser.last_name = user.last_name;

    return this.userRepository.save(updatedUser);
  }

  public async deleteUser(id: string): Promise<Users> {
    const deletedUser = this.userRepository.findOneBy({ id });
    await this.userRepository.delete({ id });
    return deletedUser;
  }
}
