import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePortDto } from './dto/create-port.dto';
import { UpdatePortDto } from './dto/update-port.dto';

// The SERVICE holds the business logic and is the only place that talks to the database.
@Injectable()
export class PortsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.port.findMany({ orderBy: { name: 'asc' } });
  }

  async findOne(id: string) {
    const port = await this.prisma.port.findUnique({ where: { id } });
    if (!port) {
      throw new NotFoundException(`Port ${id} not found`);
    }
    return port;
  }

  create(dto: CreatePortDto) {
    return this.prisma.port.create({ data: dto });
  }

  async update(id: string, dto: UpdatePortDto) {
    await this.findOne(id); // 404 if it doesn't exist
    return this.prisma.port.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.port.delete({ where: { id } });
    return { deleted: true, id };
  }
}