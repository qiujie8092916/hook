import { Controller, Post, Body, Logger } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller('/yuque')
@ApiExcludeController()
export class YuqueController {
  private readonly logger = new Logger(YuqueController.name);

  @Post('/hook')
  index(@Body() payload) {
    this.logger.log(JSON.stringify(payload));
  }
}
