import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateVesselDto } from './dto/create-vessel.dto';
import { UpdateVesselDto } from './dto/update-vessel.dto';
import { VesselsService } from './vessels.service';

// The CONTROLLER maps HTTP routes to service methods. It does no business logic itself.
// These five methods are the standard REST "CRUD" set.
@ApiTags('vessels')
@Controller('vessels')
export class VesselsController {
  constructor(private readonly vessels: VesselsService) {}

  @Get()
  findAll() {
    return this.vessels.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vessels.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateVesselDto) {
    return this.vessels.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVesselDto) {
    return this.vessels.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vessels.remove(id);
  }
}
