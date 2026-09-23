import { Module } from '@nestjs/common';
import { ContainersController } from './containers.controller';
import { ContainersService } from './containers.service';

// A MODULE groups a feature's controller + service.
@Module({
  controllers: [ContainersController],
  providers: [ContainersService],
})
export class ContainersModule {}
