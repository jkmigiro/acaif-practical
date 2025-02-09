
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  
  @Prop({ type: mongoose.Schema.Types.ObjectId})
  _id?: string;

  @Prop()
  name: string;

  @Prop({unique: true})
  email: string;

  @Prop()
  password: string;

  @Prop({default: Date.now})
  createdAt?: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);
