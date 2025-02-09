
import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import ICrud from 'src/interfaces/crud.interface';
import { Submission } from 'src/schemas/submission.schema';

type PartialCrud = Partial<ICrud<Submission>>
@Injectable()
export class SubmissionService implements PartialCrud{
  constructor(@InjectModel(Submission.name) private submissionModel: Model<Submission>) {}

  async create(createSubmission: Submission): Promise<Submission> {
    const createdSubmission = new this.submissionModel(createSubmission);
    Logger.log("Create submission:\n ",createdSubmission)
    return createdSubmission.save();
  }

  async findAll(): Promise<Submission[]> {
    Logger.log("Find all submissions")
    return this.submissionModel.find().exec();
  }

  async findById(id: any): Promise<Submission|null> {
    Logger.log("Find one submission with id: ",id)
      return this.submissionModel.findById(id).exec()
  }
}
