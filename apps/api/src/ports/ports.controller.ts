import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePortDto } from './dto/create-port.dto';
import { UpdatePortDto } from './dto/update-port.dto';
import { PortsService } from './ports.service';

// The CONTROLLER maps HTTP routes to service methods. It does no business logic itself.
@ApiTags('ports')
@Controller('ports')
export class PortsController {
  constructor(private readonly ports: PortsService) {}

  @Get()
  findAll() {
    return this.ports.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ports.findOne(id);
  }

  @Post()
  create(@Body() dto: CreatePortDto) {
    return this.ports.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePortDto) {
    return this.ports.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ports.remove(id);
  }
}