import { PartialType } from '@nestjs/swagger';
import { CreatePortDto } from './create-port.dto';

// PartialType makes every field of CreatePortDto optional — exactly what a PATCH update needs.
export class UpdatePortDto extends PartialType(CreatePortDto) {}