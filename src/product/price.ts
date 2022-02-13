import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
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
    name: 'currency_code',
  })
  @Expose({ name: 'currency_code' })
  currencyCode: string;
}
