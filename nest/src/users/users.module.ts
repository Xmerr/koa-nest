import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { isAuthenticatedMiddleware } from 'src/middleware/isAuthenticated';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAuthenticatedMiddleware)
      .forRoutes('users');
  }
}
