import { Controller, Post, Body, Logger } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller('/midjourney')
@ApiExcludeController()
export class MidjourneyController {
  private readonly logger = new Logger(MidjourneyController.name);

  @Post('hook')
  hook(@Body() payload) {
    this.logger.log(JSON.stringify(payload));
    return true;
  }
}
