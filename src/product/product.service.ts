import { HttpException, Injectable } from '@nestjs/common';
import { Product } from './product';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ProductEntity } from './entity/product.entity';
import { Price } from './price';
import { PriceEntity } from './entity/price.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: MongoRepository<ProductEntity>,
  ) {}

  async getProductsId(id: number): Promise<Product> {
    const title = await this.getProductNameByID(id);
    const product = new Product();
    product.id = id;
    product.name = title;
    const productEntity = await this.productRepository.findOne({ id });
    if (productEntity) {
      const price = new Price();
      price.value = productEntity.currentPrice.value;
      price.currency_code = productEntity.currentPrice.currencyCode;
      product.current_price = price;
    }
    return product;
  }
  async editProductsId(id: number, product: Product): Promise<Product> {
    let productEntity = await this.productRepository.findOne({ id });
    if (!productEntity) {
      productEntity = new ProductEntity();
    }
    const title = await this.getProductNameByID(id);
    productEntity.id = id;
    const priceEntity = new PriceEntity();
    priceEntity.value = product.current_price.value;
    priceEntity.currencyCode = product.current_price.currency_code;
    productEntity.currentPrice = priceEntity;
    await this.productRepository.save(productEntity);
    product.name = title;
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
