
import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PerformanceMetric } from 'src/schemas/performanceMetric.schema';
import ICrud from 'src/interfaces/crud.interface';

 type PartialCrud = Partial<ICrud<PerformanceMetric>>

@Injectable()
export class PerformanceMetricService implements PartialCrud{
  constructor(@InjectModel(PerformanceMetric.name) private performanceMetricModel: Model<PerformanceMetric>) {}

  async findAll(): Promise<PerformanceMetric[]> {
    Logger.log("Find all perfomance metrics")
    return this.performanceMetricModel.find().exec();
  }
}
