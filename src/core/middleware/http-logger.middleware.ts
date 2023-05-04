import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(HttpLoggerMiddleware.name);
  use(req: Request, res: Response, next: (error?: Error | any) => void) {
    this.logger.log(`${req.method} ${req.ip} ${req.url} ${req['headers']['user-agent']}`);
    this.logger.debug(req.headers);
    next();
  }
}
