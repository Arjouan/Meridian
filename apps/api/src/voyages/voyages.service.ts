import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVoyageDto } from './dto/create-voyage.dto';
import { UpdateVoyageDto } from './dto/update-voyage.dto';

// The SERVICE holds the business logic and is the only place that talks to the database.
@Injectable()
export class VoyagesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.voyage.findMany({
      orderBy: { reference: 'asc' },
      include: {
        vessel: true,
        portCalls: {
          orderBy: { sequence : 'asc' },
          include: { port: true },
        },
      },
    });
  }

  async findOne(id: string) {
    const voyage = await this.prisma.voyage.findUnique({
      where: { id },
      include: {
        vessel: true,
        portCalls: {
          orderBy: { sequence : 'asc' },
          include: { port: true },
        },
      },
    });
    if (!voyage) {
      throw new NotFoundException(`Voyage ${id} not found`);
    }
    return voyage;
  }

  async create(dto: CreateVoyageDto) {
    await this.assertRelationsExist(dto);
    const { portCalls, ...voyage } = dto;
    return this.prisma.voyage.create({
      data: {
        ...voyage,
        portCalls: { create: portCalls },
      },
      include: { vessel: true, portCalls: { orderBy: { sequence: 'asc' }, include: { port: true } } },
    });
  }

  async update(id: string, dto: UpdateVoyageDto) {
    await this.findOne(id); // 404 if it doesn't exist
    await this.assertRelationsExist(dto); // 400 if any relation doesn't exist
    const { portCalls, ...voyage } = dto;
    return this.prisma.voyage.update({
      where: { id },
      data: {
        ...voyage,
        portCalls: portCalls
          ? { deleteMany: {}, create: portCalls }
          : undefined,
      },
      include: { vessel: true, portCalls: { orderBy: { sequence: 'asc' }, include: { port: true } } },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.voyage.delete({ where: { id } });
    return { deleted: true, id };
  }
  private async assertRelationsExist(dto: UpdateVoyageDto) {
    if (dto.vesselId) {
      const vessel = await this.prisma.vessel.findUnique({ where: { id: dto.vesselId } });
      if (!vessel) {
        throw new BadRequestException(`Vessel ${dto.vesselId} does not exist`);
      }
    }

    for (const call of dto.portCalls ?? []) {
      const port = await this.prisma.port.findUnique({ where: { id: call.portId } });
      if (!port) {
        throw new BadRequestException(`Port ${call.portId} does not exist`);
      }
    }
    }
}