import { Module } from '@nestjs/common';
import { VesselsController } from './vessels.controller';
import { VesselsService } from './vessels.service';

// A MODULE groups a feature's controller + service. PrismaService is available because
// PrismaModule is marked @Global(). Remember to import this module in app.module.ts.
@Module({
  controllers: [VesselsController],
  providers: [VesselsService],
})
export class VesselsModule {}
