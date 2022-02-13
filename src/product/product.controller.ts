import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get('/:id')
  @ApiOperation({
    summary: 'Get Products by Id',
  })
  @ApiResponse({
    status: 200,
    description: 'Product information',
    type: Product,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Product not found',
  })
  async getProductsId(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.getProductsId(id);
  }

  @Put('/:id')
  @ApiOperation({
    summary: 'Update Products by Id',
  })
  @ApiResponse({
    status: 200,
    description: 'Product updated successfully',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Product not found',
  })
  async editProductsId(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: Product,
  ): Promise<Product> {
    return this.productService.editProductsId(id, product);
  }
}
