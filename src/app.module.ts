import { PlatformModule } from './platform/platform.module';
import { ClassSerializerInterceptor, Module, ValidationPipe } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { CoreModule } from './core/core.module';
import { CommonModule } from './common/common.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './core/exceptions';

@Module({
  imports: [CoreModule, HealthModule, MetricsModule, CommonModule, PlatformModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
      }),
    },
  ],
})
export class AppModule {}
