import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Price } from './price';

export class Product {
  @IsInt()
  @ApiProperty({
    description: 'Product Id',
  })
  id: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Product Name',
  })
  name: string;

  @ApiProperty({
    description: 'Product current price',
    type: Price,
    name: 'current_price',
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => Price)
  current_price?: Price;
}
