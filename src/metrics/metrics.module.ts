import { BasePrometheusController } from './controllers';
import { Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    PrometheusModule.register({
      defaultLabels: {},
      controller: BasePrometheusController,
    }),
  ],
})
export class MetricsModule {}
