import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ContainerStatus, ContainerType } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

// Validates the body of POST /containers. Only the ISO number is required.
export class CreateContainerDto {
  @ApiProperty({ example: 'MSCU7045312', description: 'ISO 6346 container number' })
  @IsString()
  isoNumber!: string;

  @ApiPropertyOptional({ enum: ContainerType, default: ContainerType.DRY_40 })
  @IsOptional()
  @IsEnum(ContainerType)
  type?: ContainerType;

  @ApiPropertyOptional({ example: 'MSCU', description: 'Owner/BIC code' })
  @IsOptional()
  @IsString()
  ownerCode?: string;

  @ApiPropertyOptional({ enum: ContainerStatus, default: ContainerStatus.EMPTY })
  @IsOptional()
  @IsEnum(ContainerStatus)
  status?: ContainerStatus;

  @ApiPropertyOptional({ description: 'Id of the port the container is currently at' })
  @IsOptional()
  @IsString()
  currentPortId?: string;

  @ApiPropertyOptional({ description: 'Id of the vessel carrying the container' })
  @IsOptional()
  @IsString()
  vesselId?: string;
}
