import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Users } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { Todos } from './todos/todos.entity';
import { AuthenticationMiddleware } from './middleware/authenticate';

@Module({
  controllers: [AppController],
  imports: [
    TypeOrmModule.forRoot({
      database: 'framework_test',
      entities: [Todos, Users],
      host: 'localhost',
      password: 'password',
      port: 5432,
      synchronize: true,
      type: 'postgres',
      username: 'postgres',
    }),
    UsersModule,
    TodosModule,
    TypeOrmModule.forFeature([Users]),
  ],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes({
        method: RequestMethod.ALL,
        path: '*',
      });
  }
}
