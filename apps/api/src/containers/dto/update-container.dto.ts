import { PartialType } from '@nestjs/swagger';
import { CreateContainerDto } from './create-container.dto';

// PartialType makes every field of CreateContainerDto optional — exactly what a PATCH update needs.
export class UpdateContainerDto extends PartialType(CreateContainerDto) {}
