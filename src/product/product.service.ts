import { Injectable } from '@nestjs/common';
import { Price } from './price';

@Injectable()
export class ProductService {
  getProductsId(id: number): number {
    return id;
  }
  editProductsId(id: number, price: Price): Price {
    return price;
  }
}
