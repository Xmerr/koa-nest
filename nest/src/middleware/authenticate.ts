import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { Users } from 'src/users/users.entity';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Users)
    // eslint-disable-next-line no-unused-vars
    private userRepository: Repository<Users>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if(authorization) {
      const userUuid = authorization.split(' ')[1];
      req.app.locals.user = await this.userRepository.findOneBy({ id: userUuid });
    }
    next();
  }
}
