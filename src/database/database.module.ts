import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema, User } from './entities/auth.schema';
import { Product, ProductSchema } from './entities/product.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/?directConnection=true'),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],

  controllers: [],
  exports: [MongooseModule],
})
export class DatabaseModule {}
