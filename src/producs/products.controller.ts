import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { Product } from 'src/database/entities/product.schema';
import { productDto } from './dto/productDto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProducsController {
  constructor(private readonly ProductsService: ProductsService) {}
  @Post()
  async addproducts(@Body() productDto: productDto) {
    const genratedId = await this.ProductsService.insertProduct(productDto);
    return genratedId;
  }
  @Get()
  async getAllProduct() {
    return await this.ProductsService.fetchProducts();
  }

  @Get(':id')
  async getSingleProduct(@Param('id') prodId: string) {
    return await this.ProductsService.fetchSignleProduct(prodId);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body() productDto: Partial<productDto>,
  ) {
    return await this.ProductsService.updateProduct(prodId, productDto);
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    return await this.ProductsService.removeProduct(prodId);
  }
}
