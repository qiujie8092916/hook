import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class BootstrapService implements OnApplicationBootstrap {
  private readonly logger = new Logger(BootstrapService.name);
  onApplicationBootstrap() {
    this.logger.log('系统初始化完成，这里可以放置系统初始化的内容');
  }
}
