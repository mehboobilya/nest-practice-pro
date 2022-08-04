import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './auth.schema';

export type ProductDocument = Product &
  Document & {
    _id?: any;
  };

@Schema({ timestamps: true })
export class Product {
  _id?: any;
  @Prop({ ref: User.name })
  user: string;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
