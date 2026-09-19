import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VesselStatus, VesselType } from '@prisma/client';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

// A DTO ("Data Transfer Object") describes and validates the shape of an incoming request body.
// The class-validator decorators run automatically because we enabled a global ValidationPipe
// in main.ts. Invalid input is rejected with a 400 before it ever reaches the service.
export class CreateVesselDto {
  @ApiProperty({ example: '9703291', description: 'IMO number (7 digits)' })
  @IsString()
  imo!: string;

  @ApiProperty({ example: 'MSC Oscar' })
  @IsString()
  name!: string;

  @ApiPropertyOptional({ enum: VesselType, default: VesselType.CONTAINER_SHIP })
  @IsOptional()
  @IsEnum(VesselType)
  type?: VesselType;

  @ApiPropertyOptional({ example: 19224, description: 'Capacity in TEU' })
  @IsOptional()
  @IsInt()
  @Min(0)
  capacityTeu?: number;

  @ApiPropertyOptional({ example: 'PA', description: 'Flag state (ISO code)' })
  @IsOptional()
  @IsString()
  flag?: string;

  @ApiPropertyOptional({ enum: VesselStatus, default: VesselStatus.IN_SERVICE })
  @IsOptional()
  @IsEnum(VesselStatus)
  status?: VesselStatus;
}
