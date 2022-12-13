import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todos } from './todos.entity';
import { Users } from 'src/users/users.entity';

@Module({
  controllers: [TodosController],
  imports: [
    TypeOrmModule.forFeature([Todos]),
    TypeOrmModule.forFeature([Users])
  ],
  providers: [TodosService],
})
export class TodosModule {}
