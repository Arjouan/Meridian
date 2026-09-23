// apps/api/src/ports/dto/create-port.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, Min } from 'class-validator';

// Validates the body of POST /ports. Every field is required.
export class CreatePortDto {
  @ApiProperty({ example: 'NLRTM', description: 'UN/LOCODE (5 characters)' })
  @IsString()
  locode!: string;

  @ApiProperty({ example: 'Port of Rotterdam' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'NL', description: 'ISO country code' })
  @IsString()
  country!: string;

  @ApiProperty({ example: 51.95, description: 'Latitude in degrees' })
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude!: number;

  @ApiProperty({ example: 4.14, description: 'Longitude in degrees' })
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude!: number;
}