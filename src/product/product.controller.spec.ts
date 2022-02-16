import { Product } from './product';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    service = new ProductService(null);
    controller = new ProductController(service);
  });

  it('should be call getProductsId from ProductService', async () => {
    const product = new Product();
    const getProductsIdSpy = jest
      .spyOn(service, 'getProductsId')
      .mockResolvedValue(product);
    const actual = await controller.getProductsId(1);
    expect(getProductsIdSpy).toHaveBeenCalledWith(1);
    expect(actual).toEqual(product);
  });

  it('should be call editProductsId from ProductService', async () => {
    const product = new Product();
    const editProductsIdSpy = jest
      .spyOn(service, 'editProductsId')
      .mockResolvedValue(product);
    const actual = await controller.editProductsId(1, product);
    expect(editProductsIdSpy).toHaveBeenCalledWith(1, product);
    expect(actual).toEqual(product);
  });
});
