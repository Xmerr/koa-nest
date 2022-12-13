import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Todos } from 'src/todos/todos.entity';
import { Users } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public create(@Body() user: Users): Promise<Users> {
    return this.usersService.create(user);
  }

  @Get()
  public findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<Users> {
    return this.usersService.findById(id);
  }

  @Get(':id/todos')
  public getTodos(@Param('id') id: string): Promise<Todos[]> {
    return this.usersService.getTodos(id);
  }

  @Put(':id')
  public updateOne(@Param('id') id: string, @Body() user: Users): Promise<Users> {
    return this.usersService.updateOne(id, user);
  }

  @Delete(':id')
  public deleteOne(@Param('id') id: string): Promise<Users> {
    return this.usersService.deleteUser(id);
  }
}
