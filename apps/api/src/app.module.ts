import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { VesselsModule } from './vessels/vessels.module';
import { PortsModule } from './ports/ports.module';
import { ContainersModule } from './containers/containers.module';
import { VoyagesModule } from './voyages/voyages.module';
@Module({
  imports: [
    // Reads the repo-root .env (two levels up) or a local .env.
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['../../.env', '.env'] }),
    PrismaModule,
    HealthModule,
    VesselsModule,
    PortsModule,
    VoyagesModule,
    ContainersModule,
  ],
})
export class AppModule {}
