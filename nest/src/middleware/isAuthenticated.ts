import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class isAuthenticatedMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if(!req.app.locals?.user?.id) {
      throw new UnauthorizedException();
    }

    next();
  }
}
