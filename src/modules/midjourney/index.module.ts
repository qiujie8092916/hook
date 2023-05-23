import { Module } from '@nestjs/common';
import { MidjourneyController } from './index.controller';

@Module({
  imports: [],
  controllers: [MidjourneyController],
  providers: [],
})
export class MidjourneyModule {}
