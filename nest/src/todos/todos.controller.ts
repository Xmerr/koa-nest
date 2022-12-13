import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Users } from 'src/users/users.entity';
import { Todos } from './todos.entity';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly todosService: TodosService) {}

  @Post()
  public create(@Body() todo: Todos): Promise<Todos> {
    return this.todosService.create(todo);
  }

  @Get()
  public findAll(): Promise<Todos[]> {
    return this.todosService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<Todos> {
    return this.todosService.findOne(id);
  }

  @Get(':id/assignee')
  public findAssignee(@Param('id') id: string): Promise<Users> {
    return this.todosService.findAssignee(id);
  }

  @Put(':id')
  public updateTodo(@Param('id') id: string, @Body() todo: Todos): Promise<Todos> {
    return this.todosService.updateOne(id, todo);
  }

  @Put(':id/assign')
  public assignTodo(@Param('id') id: string, @Body() body: { userId: string }): Promise<Todos> {
    const { userId } = body;
    return this.todosService.assignTodo(id, userId);
  }

  @Delete(':id')
  public deleteTodo(@Param('id') id: string): Promise<Todos> {
    return this.todosService.delete(id);
  }
}
