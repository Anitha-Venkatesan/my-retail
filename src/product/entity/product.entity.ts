import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { PriceEntity } from './price.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @ObjectIdColumn()
  _id: number;

  @Column({ unique: true })
  id: number;

  @Column(() => PriceEntity)
  currentPrice: PriceEntity;
}
