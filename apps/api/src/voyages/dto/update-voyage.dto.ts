import { PartialType } from '@nestjs/swagger';
import { CreateVoyageDto } from './create-voyage.dto';

// PartialType makes every field of CreateVoyageDto optional — exactly what a PATCH update needs.
export class UpdateVoyageDto extends PartialType(CreateVoyageDto) {}
