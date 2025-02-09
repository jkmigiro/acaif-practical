
import mongoose, { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Campaign } from 'src/schemas/campaign.schema';
import ICrud from 'src/interfaces/crud.interface';


type PartialCrud = Partial<ICrud<Campaign>>
@Injectable()
export class CampaignService implements PartialCrud{
  constructor(@InjectModel(Campaign.name) private campaignModel: Model<Campaign>) {}

  async create(createCampaign: Campaign): Promise<Campaign> {
    createCampaign.updatedAt=new Date()
    Logger.log("Create campaign:\n ",createCampaign)
    let createdCampaign:any;
    if(createCampaign._id){
      Logger.log("Updating id: ",createCampaign._id)
      createdCampaign=this.campaignModel.updateOne({_id: new mongoose.Types.ObjectId(createCampaign._id)}, createCampaign)
    }else{
      Logger.log("Saving id: ",createCampaign._id)
      createCampaign._id=new mongoose.Types.ObjectId().toString()
      createCampaign.userId=new mongoose.Types.ObjectId(createCampaign.userId).toString()
      createdCampaign=new this.campaignModel(createCampaign).save()
    }
    return createdCampaign;
  }

  async findAll(): Promise<Campaign[]> {
    Logger.log("Find all campaigns")
    return this.campaignModel.find().exec();
  }

  async findAllByUserId(userId: string): Promise<Campaign[]> {
    Logger.log("Find all campaigns by user id: ",userId)
    const campaigns =  this.campaignModel.find({ userId: new mongoose.Types.ObjectId(userId) }).exec()
    Logger.log("Campaigns of user with id: ",userId,"\n")
    Logger.log(campaigns)
    return campaigns;
  }

  async findById(id: any): Promise<Campaign|null> {
    Logger.log("Find one campaign with id: ",id)
    return this.campaignModel.findById(id).exec()
}
}
