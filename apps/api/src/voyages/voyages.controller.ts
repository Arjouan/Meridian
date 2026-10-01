import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VoyagesService } from './voyages.service';
import { CreateVoyageDto } from './dto/create-voyage.dto';
import { UpdateVoyageDto } from './dto/update-voyage.dto';

// The CONTROLLER maps HTTP routes to service methods. It does no business logic itself.
@ApiTags('voyages')
@Controller('voyages')
export class VoyagesController {
  constructor(private readonly voyages: VoyagesService) {}

  @Get()
  findAll() {
    return this.voyages.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voyages.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateVoyageDto) {
    return this.voyages.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVoyageDto) {
    return this.voyages.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.voyages.remove(id);
  }
}
