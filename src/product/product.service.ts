import { HttpException, Injectable } from '@nestjs/common';
import { Product } from './product';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ProductEntity } from './entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: MongoRepository<ProductEntity>,
  ) {}
  async getProductsId(id: number): Promise<Product> {
    const title = await this.getProductNameByID(id);
    const product = new Product();
    const productEntity = await this.productRepository.findOne({ id });
    product.id = id;
    product.name = title;
    if (productEntity) {
      product.currentPrice = productEntity.currentPrice;
    }
    return product;
  }
  async editProductsId(id: number, product: Product): Promise<Product> {
    let productEntity = await this.productRepository.findOne({ id });
    const title = await this.getProductNameByID(id);
    if (!productEntity) {
      productEntity = new ProductEntity();
    }
    productEntity.id = id;
    product.name = title;
    productEntity.currentPrice = product.currentPrice;
    await this.productRepository.save(productEntity);
    return product;
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
