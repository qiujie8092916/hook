import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { PrometheusController } from '@willsoto/nestjs-prometheus';
import { Response } from 'express';
import { Public } from 'src/core/decorators';

@Controller('metrics')
@ApiExcludeController()
@Public()
export class BasePrometheusController extends PrometheusController {
  @Get()
  index(@Res() response: Response) {
    return super.index(response);
  }
}
