import { Todos } from 'src/todos/todos.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ nullable: false })
    first_name: string;

  @Column({ nullable: false })
    last_name: string;

  @OneToMany(() => Todos, todo => todo.user)
    todos: Todos[];
}