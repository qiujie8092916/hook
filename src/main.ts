import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { APIInterceptor } from './core/interceptors';
import { AppModule } from './app.module';
import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug'],
  });
  const logger = new Logger('Bootstrap');
  // 增加版本号
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // 统一的响应处理器
  app.useGlobalInterceptors(new APIInterceptor());

  // 开启压缩响应体，提高响应速度
  app.use(compression());

  // 开启cookies解析
  app.use(cookieParser());

  const port = process.env.PORT;
  if (!port) {
    throw new Error('请设置环境变量`PORT`');
  }

  await app.listen(port, '0.0.0.0');
  logger.log(`Server running on port ${port}, http://localhost:${port}`);
}
bootstrap();
