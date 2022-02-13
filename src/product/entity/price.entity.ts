import { Column } from 'typeorm';

export class PriceEntity {
  @Column()
  value: number;
  @Column()
  currencyCode: string;
}
