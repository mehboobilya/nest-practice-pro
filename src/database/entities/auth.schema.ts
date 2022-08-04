import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type userDocument = User &
  Document & {
    _id?: any;
  };

@Schema({ timestamps: true })
export class User {
  _id?: any;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;
  @Prop({ required: true })
  password: string;
}

export const userSchema = SchemaFactory.createForClass(User);
