
import { Controller, Get, Post, Body } from '@nestjs/common';
import ICrud from 'src/interfaces/crud.interface';
import { PerformanceMetric } from 'src/schemas/performanceMetric.schema';
import { PerformanceMetricService } from './performanceMetric.service';


type PartialCrud = Partial<ICrud<PerformanceMetric>>
@Controller('performanceMetrics')
export class PerformanceMetricController implements PartialCrud {
    constructor(private performanceMetricService: PerformanceMetricService) { }


    @Get()
    async findAll(): Promise<PerformanceMetric[]> {
        console.log("Find performance metrics")
        return this.performanceMetricService.findAll();
    }

}
