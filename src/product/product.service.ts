import { Injectable } from '@nestjs/common';
import { Price } from './price';
import { Product } from './product';
import axios from 'axios';

@Injectable()
export class ProductService {
  async getProductsId(id: number): Promise<Product> {
    const response = await axios.get(
      `https://redsky-uat.perf.target.com/redsky_aggregations/v1/redsky/case_study_v1?key=3yUxt7WltYG7MFKPp7uyELi1K40ad2ys&tcin=${id}`,
    );
    const product = new Product();
    const productName =
      response.data.data.product.item.product_description.title;
    product.id = id;
    product.name = productName;
    return product;
  }
  editProductsId(id: number, price: Price): Price {
    return price;
  }
}
