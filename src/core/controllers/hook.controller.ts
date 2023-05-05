import { Controller, Post, Req, Body, Logger } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller('/hook')
@ApiExcludeController()
export class HookController {
  private readonly logger = new Logger(HookController.name);

  @Post()
  index(@Body() payload, @Req() query): string {
    this.logger.log(JSON.stringify(payload))
    this.logger.log(JSON.stringify(query))
    return 'success';
  }
}
