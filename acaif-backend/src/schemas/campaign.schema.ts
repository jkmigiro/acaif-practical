
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type CampaignDocument = HydratedDocument<Campaign>;

@Schema()
export class Campaign {
  @Prop({ type: mongoose.Schema.Types.ObjectId})
  _id?: string
  
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId,ref:'User'})
  userId: string;

  @Prop()
  description: string;

  @Prop({enum:["Active","Completed"]})
  status: string;

  @Prop()
  deadline: Date;

  @Prop()
  content:string;

  @Prop({default: Date.now})
  createdAt?: Date;

  @Prop({default: Date.now})
  updatedAt?: Date;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
