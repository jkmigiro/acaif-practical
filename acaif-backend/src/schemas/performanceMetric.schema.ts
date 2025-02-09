
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Campaign } from './campaign.schema';
import { User } from './user.schema';

export type PerformanceMetricDocument = HydratedDocument<PerformanceMetric>;

@Schema()
export class PerformanceMetric {
    @Prop({ type: mongoose.Schema.Types.ObjectId })
    _id: string;
  
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' })
    campaignId: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: string;

    @Prop()
    totalPosts: number;

    @Prop()
    submissionDates: Date[];

    @Prop()
    likes: number;

    @Prop()
    shares: number;

    @Prop()
    comments: number;

}

export const PerformanceMetricSchema = SchemaFactory.createForClass(PerformanceMetric);
