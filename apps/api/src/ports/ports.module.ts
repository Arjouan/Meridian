import { Module } from '@nestjs/common';
import { PortsController } from './ports.controller';
import { PortsService } from './ports.service';

// A MODULE groups a feature's controller + service.
@Module({
  controllers: [PortsController],
  providers: [PortsService],
})
export class PortsModule {}