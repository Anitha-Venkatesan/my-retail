import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { MongoRepository } from 'typeorm';
import { PriceEntity } from './entity/price.entity';
import { ProductEntity } from './entity/product.entity';
import { Price } from './price';
import { Product } from './product';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let repository: MongoRepository<ProductEntity>;

  beforeEach(async () => {
    repository = new MongoRepository<ProductEntity>();
    service = new ProductService(repository);
  });

  it('should get product and price information', async () => {
    const getProductNameByIDSpy = jest.spyOn(axios, 'get').mockResolvedValue({
      data: {
        data: {
          product: {
            item: {
              product_description: {
                title: 'product name',
              },
            },
          },
        },
      },
    });
    const productEntity = new ProductEntity();
    productEntity.id = 1;
    const priceEntity = new PriceEntity();
    priceEntity.value = 12;
    priceEntity.currencyCode = 'USD';
    productEntity.currentPrice = priceEntity;
    const findOneSpy = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(productEntity);
    const actual = await service.getProductsId(1);
    expect(getProductNameByIDSpy).toHaveBeenCalledWith(
      'https://redsky-uat.perf.target.com/redsky_aggregations/v1/redsky/case_study_v1?key=3yUxt7WltYG7MFKPp7uyELi1K40ad2ys&tcin=1',
    );
    expect(findOneSpy).toHaveBeenCalledWith({ id: 1 });
    expect(actual.id).toEqual(1);
    expect(actual.name).toEqual('product name');
    expect(actual.current_price.value).toEqual(12);
    expect(actual.current_price.currency_code).toEqual('USD');
  });

  it('should get product and but not price information', async () => {
    const getProductNameByIDSpy = jest.spyOn(axios, 'get').mockResolvedValue({
      data: {
        data: {
          product: {
            item: {
              product_description: {
                title: 'product name',
              },
            },
          },
        },
      },
    });
    const findOneSpy = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(null);
    const actual = await service.getProductsId(1);
    expect(getProductNameByIDSpy).toHaveBeenCalledWith(
      'https://redsky-uat.perf.target.com/redsky_aggregations/v1/redsky/case_study_v1?key=3yUxt7WltYG7MFKPp7uyELi1K40ad2ys&tcin=1',
    );
    expect(findOneSpy).toHaveBeenCalledWith({ id: 1 });
    expect(actual.id).toEqual(1);
    expect(actual.name).toEqual('product name');
    expect(actual.current_price).not.toBeDefined();
  });

  it('should update price information', async () => {
    const product = new Product();
    product.id = 1;
    const price = new Price();
    price.value = 13;
    price.currency_code = 'INR';
    product.current_price = price;

    const productEntity = new ProductEntity();
    productEntity.id = 1;
    const priceEntity = new PriceEntity();
    priceEntity.value = 12;
    priceEntity.currencyCode = 'USD';
    productEntity.currentPrice = priceEntity;

    const newProductEntity = new ProductEntity();
    newProductEntity.id = 1;
    const newPriceEntity = new PriceEntity();
    newPriceEntity.value = 13;
    newPriceEntity.currencyCode = 'INR';
    newProductEntity.currentPrice = newPriceEntity;

    const findOneSpy = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(productEntity);

    const getProductNameByIDSpy = jest.spyOn(axios, 'get').mockResolvedValue({
      data: {
        data: {
          product: {
            item: {
              product_description: {
                title: 'product name',
              },
            },
          },
        },
      },
    });

    const saveSpy = jest.spyOn(repository, 'save').mockResolvedValue(null);
    const actual = await service.editProductsId(1, product);
    expect(findOneSpy).toHaveBeenCalledWith({ id: 1 });
    expect(getProductNameByIDSpy).toHaveBeenCalledWith(
      'https://redsky-uat.perf.target.com/redsky_aggregations/v1/redsky/case_study_v1?key=3yUxt7WltYG7MFKPp7uyELi1K40ad2ys&tcin=1',
    );
    expect(saveSpy).toHaveBeenCalledWith(newProductEntity);
    expect(actual.id).toEqual(1);
    expect(actual.name).toEqual('product name');
    expect(actual.current_price.value).toEqual(13);
    expect(actual.current_price.currency_code).toEqual('INR');
  });

  it('should create price information', async () => {
    const product = new Product();
    product.id = 1;
    const price = new Price();
    price.value = 13;
    price.currency_code = 'INR';
    product.current_price = price;

    const newProductEntity = new ProductEntity();
    newProductEntity.id = 1;
    const newPriceEntity = new PriceEntity();
    newPriceEntity.value = 13;
    newPriceEntity.currencyCode = 'INR';
    newProductEntity.currentPrice = newPriceEntity;

    const findOneSpy = jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(null);

    const getProductNameByIDSpy = jest.spyOn(axios, 'get').mockResolvedValue({
      data: {
        data: {
          product: {
            item: {
              product_description: {
                title: 'product name',
              },
            },
          },
        },
      },
    });

    const saveSpy = jest.spyOn(repository, 'save').mockResolvedValue(null);
    const actual = await service.editProductsId(1, product);
    expect(findOneSpy).toHaveBeenCalledWith({ id: 1 });
    expect(getProductNameByIDSpy).toHaveBeenCalledWith(
      'https://redsky-uat.perf.target.com/redsky_aggregations/v1/redsky/case_study_v1?key=3yUxt7WltYG7MFKPp7uyELi1K40ad2ys&tcin=1',
    );
    expect(saveSpy).toHaveBeenCalledWith(newProductEntity);
    expect(actual.id).toEqual(1);
    expect(actual.name).toEqual('product name');
    expect(actual.current_price.value).toEqual(13);
    expect(actual.current_price.currency_code).toEqual('INR');
  });
});
