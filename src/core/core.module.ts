import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './../config/configuration';
import { IndexController } from './controllers';
import { HttpLoggerMiddleware } from './middleware';
import { BootstrapService } from './services';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['.env.development.local', '.env.development', '.env'],
      load: [configuration],
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'mysql',
    //     host: configService.get<string>('MYSQL_HOST'),
    //     port: configService.get<number>('MYSQL_PORT'),
    //     username: configService.get<string>('MYSQL_USER'),
    //     password: configService.get<string>('MYSQL_PASSWORD'),
    //     database: configService.get<string>('MYSQL_DATABASE'),
    //     entities: [],
    //     synchronize: false,
    //     autoLoadEntities: true,
    //     debug: false,
    //     logging: true,
    //     timezone: '+08:00',
    //     ssl: false,
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [IndexController],
  providers: [BootstrapService],
  exports: [BootstrapService],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
