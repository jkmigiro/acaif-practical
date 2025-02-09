
import { Controller, Get, Post, Body } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import ICrud from 'src/interfaces/crud.interface';
import { Submission } from 'src/schemas/submission.schema';


type PartialCrud = Partial<ICrud<Submission>>
@Controller('submissions')
export class SubmissionController implements PartialCrud {
    constructor(private submissionService: SubmissionService) { }

    @Post()
    async create(@Body() createSubmission: Submission) {
        this.submissionService.create(createSubmission);
    }

    @Get()
    async findAll(): Promise<Submission[]> {
        console.log("Find submissions")
        return this.submissionService.findAll();
    }

    @Get()
    async findById(id: any): Promise<Submission | null> {
        return this.submissionService.findById(id)
    }
}
