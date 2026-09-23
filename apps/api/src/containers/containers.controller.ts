import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContainersService } from './containers.service';
import { CreateContainerDto } from './dto/create-container.dto';
import { UpdateContainerDto } from './dto/update-container.dto';

// The CONTROLLER maps HTTP routes to service methods. It does no business logic itself.
@ApiTags('containers')
@Controller('containers')
export class ContainersController {
  constructor(private readonly containers: ContainersService) {}

  @Get()
  findAll() {
    return this.containers.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.containers.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateContainerDto) {
    return this.containers.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateContainerDto) {
    return this.containers.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.containers.remove(id);
  }
}
