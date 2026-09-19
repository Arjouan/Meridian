import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVesselDto } from './dto/create-vessel.dto';
import { UpdateVesselDto } from './dto/update-vessel.dto';

// The SERVICE holds the business logic and is the only place that talks to the database.
// Controllers stay thin; services stay testable. (See docs/ARCHITECTURE.md — the "golden rule".)
@Injectable()
export class VesselsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.vessel.findMany({ orderBy: { name: 'asc' } });
  }

  async findOne(id: string) {
    const vessel = await this.prisma.vessel.findUnique({ where: { id } });
    if (!vessel) {
      throw new NotFoundException(`Vessel ${id} not found`);
    }
    return vessel;
  }

  create(dto: CreateVesselDto) {
    return this.prisma.vessel.create({ data: dto });
  }

  async update(id: string, dto: UpdateVesselDto) {
    await this.findOne(id); // 404 if it doesn't exist
    return this.prisma.vessel.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.vessel.delete({ where: { id } });
    return { deleted: true, id };
  }
}
