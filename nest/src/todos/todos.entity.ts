import { Users } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Todos {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ nullable: false })
    title: string;

  @ManyToOne(() => Users, user => user.todos)
  @JoinColumn({ name: 'assignee' })
    user: Users;
}