
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Campaign } from './campaign.schema';
import { User } from './user.schema';

export type SubmissionDocument = HydratedDocument<Submission>;

@Schema()
export class Submission {

    @Prop({ type: mongoose.Schema.Types.ObjectId })
    _id?: string;
  
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' })
    campaignId: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Influencer' })
    userId: string;

    @Prop({default: Date.now})
    createdAt?: Date;

}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);
