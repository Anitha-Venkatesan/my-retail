import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Price } from './price';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get('/products/:id')
  getProductsId(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getProductsId(id);
  }
  @Put('/products/:id')
  editProductsId(
    @Param('id', ParseIntPipe) id: number,
    @Body() price: Price,
  ): Price {
    console.log(price);
    return this.productService.editProductsId(id, price);
  }
}
