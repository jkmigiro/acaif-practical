
import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Campaign } from 'src/schemas/campaign.schema';
import ICrud from 'src/interfaces/crud.interface';


type PartialCrud = Partial<ICrud<Campaign>>
@Injectable()
export class CampaignService implements PartialCrud{
  constructor(@InjectModel(Campaign.name) private campaignModel: Model<Campaign>) {}

  async create(createCampaign: Campaign): Promise<Campaign> {
    createCampaign.updatedAt=new Date()
    let createdCampaign:any;
    if(createCampaign._id){
      createdCampaign=this.campaignModel.updateOne({_id: new mongoose.Types.ObjectId(createCampaign._id)}, createCampaign)
    }else{
      createCampaign._id=new mongoose.Types.ObjectId().toString()
      createCampaign.userId=new mongoose.Types.ObjectId(createCampaign.userId).toString()
      createdCampaign=new this.campaignModel(createCampaign).save()
    }
    return createdCampaign;
  }

  async findAll(): Promise<Campaign[]> {
    return this.campaignModel.find().exec();
  }

  async findAllByUserId(userId: string): Promise<Campaign[]> {
    const campaigns =  this.campaignModel.find({ userId: new mongoose.Types.ObjectId(userId) }).exec()
    return campaigns;
  }

  async findById(id: any): Promise<Campaign|null> {
    return this.campaignModel.findById(id).exec()
}
}
