import { PartialType } from '@nestjs/swagger';
import { CreateVesselDto } from './create-vessel.dto';

// PartialType makes every field of CreateVesselDto optional — exactly what a PATCH update needs.
export class UpdateVesselDto extends PartialType(CreateVesselDto) {}
