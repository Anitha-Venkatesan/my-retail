import { IsInt, IsString } from 'class-validator';
import { Price } from './price';

export class Product {
  @IsInt()
  id: number;
  @IsString()
  name: string;
  currentPrice: Price;
}
