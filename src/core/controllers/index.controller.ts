import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller('/')
@ApiExcludeController()
export class IndexController {
  @Get()
  index(): string {
    return 'hello jojo!';
  }
}
