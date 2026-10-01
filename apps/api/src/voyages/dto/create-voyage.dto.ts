import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VoyageStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

// One stop in the voyage. Used inside CreateVoyageDto.portCalls.
export class CreatePortCallDto {
  @ApiProperty({ description: 'Id of the port' })
  @IsString()
  portId!: string;

  @ApiProperty({ example: 1, description: 'Order of the call in the voyage (1, 2, 3…)' })
  @IsInt()
  @Min(1)
  sequence!: number;

  @ApiPropertyOptional({ example: '2026-10-01T08:00:00Z' })
  @IsOptional()
  @IsDateString()
  plannedArrival?: string;

  @ApiPropertyOptional({ example: '2026-10-01T18:00:00Z' })
  @IsOptional()
  @IsDateString()
  plannedDeparture?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  actualArrival?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  actualDeparture?: string;
}

// Validates the body of POST /voyages.
export class CreateVoyageDto {
  @ApiProperty({ example: 'MSC-2026-014' })
  @IsString()
  reference!: string;

  @ApiProperty({ description: 'Id of the vessel sailing this voyage' })
  @IsString()
  vesselId!: string;

  @ApiPropertyOptional({ enum: VoyageStatus, default: VoyageStatus.PLANNED })
  @IsOptional()
  @IsEnum(VoyageStatus)
  status?: VoyageStatus;

  @ApiPropertyOptional({ type: [CreatePortCallDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePortCallDto)
  portCalls?: CreatePortCallDto[];
}
