import { Module } from '@nestjs/common';
import { VoyagesController } from './voyages.controller';
import { VoyagesService } from './voyages.service';

// A MODULE groups a feature's controller + service.
@Module({
  controllers: [VoyagesController],
  providers: [VoyagesService],
})
export class VoyagesModule {}
