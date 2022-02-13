import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class Price {
  @IsNumber()
  @ApiProperty({
    description: 'Product price',
  })
  value: number;

  @IsString()
  @ApiProperty({
    description: 'Product currency code',
  })
  currencyCode: string;
}
