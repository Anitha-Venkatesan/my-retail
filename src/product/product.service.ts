import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Price } from './price';
import { Product } from './product';
import axios from 'axios';

@Injectable()
export class ProductService {
  async getProductsId(id: number): Promise<Product> {
    const title = await this.getProductNameByID(id);
    const product = new Product();
    product.id = id;
    product.name = title;
    return product;
  }
  editProductsId(id: number, price: Price): Price {
    return price;
  }
  async getProductNameByID(id: number): Promise<string> {
    let response;
    try {
      response = await axios.get(
        `https://redsky-uat.perf.target.com/redsky_aggregations/v1/redsky/case_study_v1?key=3yUxt7WltYG7MFKPp7uyELi1K40ad2ys&tcin=${id}`,
      );
    } catch (error) {
      const statusCode = error.response.status;
      const message = error.response.statusText;
      throw new HttpException(message, statusCode);
    }
    const title = response.data.data.product.item.product_description.title;
    return title;
  }
}
