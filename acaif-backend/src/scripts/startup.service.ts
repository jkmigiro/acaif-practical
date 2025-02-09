import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Campaign, CampaignDocument } from "src/schemas/campaign.schema";
import { User, UserDocument } from "src/schemas/user.schema";
import { Submission, SubmissionDocument } from "src/schemas/submission.schema";
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StartupScriptService implements OnModuleInit {
    constructor(@InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Submission.name) private submissionModel: Model<SubmissionDocument>) { }

    async onModuleInit() {
        await this.userModel.collection.drop().catch((err) => {
            if (err.code === 26) {
            } else {
                throw err;
            }
        });

        await this.campaignModel.collection.drop().catch((err) => {
            if (err.code === 26) {
            } else {
                throw err;
            }
        });

        await this.submissionModel.collection.drop().catch((err) => {
            if (err.code === 26) {
            } else {
                throw err;
            }
        });

        const users: User[]=[
            {
                _id: new mongoose.Types.ObjectId().toString(),
                name: "John Doe",
                email: "john.doe@example.com",
                password: await bcrypt.hash("one",10)
            },
            {
                _id: new mongoose.Types.ObjectId().toString(),
                name: "Jane Smith",
                email: "jane.smith@example.com",
                password: await bcrypt.hash("two",10)
            }
        ]

        const savedUsers=await this.userModel.insertMany(users);

        const campaigns: Campaign[] =[{
            name: "Summer Campaign",
            description: "A campaign for summer influencers.",
            status: "Active",
            userId: savedUsers[0]._id,
            deadline: new Date("2025-12-31"),
            content: `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis egestas convallis odio nec ultrices.
 Curabitur ut ligula diam. Pellentesque scelerisque aliquam enim, ac euismod arcu vulputate quis.
 Quisque aliquam nisi a tempus varius. Nulla et tincidunt risus, eget mattis arcu. Donec nec libero ipsum. Pellentesque porta tellus ligula, nec faucibus mauris auctor in.
 Suspendisse rutrum mauris a ipsum bibendum, eget placerat enim vestibulum.
  Praesent pulvinar, urna eu consequat dapibus, ipsum dui lacinia dui, at posuere nisl nisi et mi. 
  Maecenas viverra, tortor nec dictum condimentum, mauris ipsum sagittis tellus, vel elementum elit elit quis orci. 
  `
        },
        {
            name: "Winter Campaign",
            description: "A campaign for winter influencers.",
            status: "Active",
            userId: savedUsers[0]._id,
            deadline: new Date("2025-10-31"),
            content: `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis egestas convallis odio nec ultrices.
 Curabitur ut ligula diam. Pellentesque scelerisque aliquam enim, ac euismod arcu vulputate quis.
 Quisque aliquam nisi a tempus varius. Nulla et tincidunt risus, eget mattis arcu. Donec nec libero ipsum. Pellentesque porta tellus ligula, nec faucibus mauris auctor in.
 Suspendisse rutrum mauris a ipsum bibendum, eget placerat enim vestibulum.
  Praesent pulvinar, urna eu consequat dapibus, ipsum dui lacinia dui, at posuere nisl nisi et mi. 
  Maecenas viverra, tortor nec dictum condimentum, mauris ipsum sagittis tellus, vel elementum elit elit quis orci. 
  `
        }] 
        const savedCampaigns=await this.campaignModel.insertMany(campaigns);
        const submissions: Submission[] =[{
            campaignId: savedCampaigns[0]._id,
            userId: savedUsers[0]._id
        },
        {
            campaignId: savedCampaigns[1]._id,
            userId: savedUsers[0]._id,
        }
    ]

    await this.submissionModel.insertMany(submissions);
   
      
    }
}
