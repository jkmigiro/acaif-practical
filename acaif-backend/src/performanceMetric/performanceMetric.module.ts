
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PerformanceMetric, PerformanceMetricSchema } from 'src/schemas/performanceMetric.schema';
import { PerformanceMetricController } from './performanceMetric.controller';
import { PerformanceMetricService } from './performanceMetric.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: PerformanceMetric.name, schema: PerformanceMetricSchema }])],
  controllers: [PerformanceMetricController],
  providers: [PerformanceMetricService],
})
export class PerformanceMetricModule {}
