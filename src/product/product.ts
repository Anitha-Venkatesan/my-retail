import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';
import { Price } from './price';

export class Product {
  @IsInt()
  @ApiProperty({
    description: 'Product Id',
  })
  id: number;

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
  @Expose({ name: 'current_price' })
  currentPrice?: Price;
}
