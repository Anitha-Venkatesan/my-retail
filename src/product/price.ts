import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class Price {
  @ApiProperty({
    description: 'Product price',
  })
  @IsNumber()
  value: number;

  @ApiProperty({
    description: 'Product currency code',
    name: 'currency_code',
  })
  @IsString()
  currency_code: string;
}
