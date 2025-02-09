import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampaignModule } from './campaign/campaign.module';
import { UserModule } from './user/user.module';
import { PerformanceMetricModule } from './performanceMetric/performanceMetric.module';
import { SubmissionModule } from './submission/submission.module';
import { StartupScriptService } from './scripts/startup.service';
import { User, UserSchema } from './schemas/user.schema';
import { Campaign, CampaignSchema } from './schemas/campaign.schema';
import { Submission, SubmissionSchema } from './schemas/submission.schema';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/acaif'),
    MongooseModule.forFeature([
      { name: Campaign.name, schema: CampaignSchema },
      { name: User.name, schema: UserSchema },
      { name: Submission.name, schema: SubmissionSchema }
    ]),
   
    CampaignModule,
    UserModule,
    PerformanceMetricModule,
    SubmissionModule,
    AuthModule,],
    
  controllers: [AppController],
  providers: [AppService,StartupScriptService],
 
})
export class AppModule { }
