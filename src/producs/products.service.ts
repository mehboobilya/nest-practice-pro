import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/database/entities/product.schema';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModal: Model<ProductDocument>,
  ) {}

  async insertProduct(productDto) {
    return await this.productModal.create(productDto);
  }

  async fetchProducts() {
    const result = await this.productModal.find();
    return result;
  }

  async fetchSignleProduct(productId: string) {
    const product = await this.findProduct(productId);
    const { _id, title, description, price } = product;
    return { _id, title, description, price };
  }

  async updateProduct(productId: string, dto) {
    const updateProduct = await this.productModal.findByIdAndUpdate(
      productId,
      dto,
    );

    return updateProduct;
  }

  async removeProduct(prodId: string) {
    await this.productModal.deleteOne({ _id: prodId });
    return { status: '200', message: 'Product deleted successfully' };
  }

  private async findProduct(id: string): Promise<Product> {
    return await this.productModal.findById(id).lean();
  }
}
