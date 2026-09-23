import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContainerDto } from './dto/create-container.dto';
import { UpdateContainerDto } from './dto/update-container.dto';

// The SERVICE holds the business logic and is the only place that talks to the database.
@Injectable()
export class ContainersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.container.findMany({
      orderBy: { isoNumber: 'asc' },
      include: { vessel: true, currentPort: true },
    });
  }

  async findOne(id: string) {
    const container = await this.prisma.container.findUnique({
      where: { id },
      include: { vessel: true, currentPort: true },
    });
    if (!container) {
      throw new NotFoundException(`Container ${id} not found`);
    }
    return container;
  }

  create(dto: CreateContainerDto) {
    return this.prisma.container.create({ data: dto });
  }

  async update(id: string, dto: UpdateContainerDto) {
    await this.findOne(id); // 404 if it doesn't exist
    return this.prisma.container.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.container.delete({ where: { id } });
    return { deleted: true, id };
  }
}
