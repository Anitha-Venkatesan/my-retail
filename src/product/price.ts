import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class Price {
  @IsNumber()
  value: number;
  @IsString()
  @Expose({ name: 'currency_code' })
  currencyCode: string;
}
