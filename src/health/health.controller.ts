import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { HealthCheckService, HealthCheck, MemoryHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { Response } from 'express';
import { Public } from 'src/core/decorators';

@Controller('health')
@ApiExcludeController()
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @Public()
  async check(@Res() res: Response) {
    const data = await this.health.check(
      // 内存占用不得超过4GB
      [() => this.memory.checkHeap('memory_heap', 4 * 1024 * 1024 * 1024), () => this.db.pingCheck('database')],
    );
    res.send(data);
  }
}
