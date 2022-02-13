import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
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
  })
  currentPrice?: Price;
}
