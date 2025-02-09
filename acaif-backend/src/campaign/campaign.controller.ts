
import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';

import { Campaign } from 'src/schemas/campaign.schema';
import { CampaignService } from './campaign.service';
import ICrud from 'src/interfaces/crud.interface';
import { AuthGuard } from '@nestjs/passport';

type PartialCrud = Partial<ICrud<Campaign>>
@Controller('campaigns')
export class CampaignController {
  constructor(private campaignService: CampaignService) {}

  @Post()
  @UseGuards(AuthGuard("jwt"))
  async create(@Body() createCampaign: Campaign) {
    this.campaignService.create(createCampaign);
  }

  @Get()
  @UseGuards(AuthGuard("jwt"))
  async findAll(): Promise<Campaign[]> {
    return this.campaignService.findAll();
  }

  @Get('user')
  @UseGuards(AuthGuard("jwt"))
  async findAllByUserId(@Query('userId') userId: string): Promise<Campaign[]> {
    return this.campaignService.findAllByUserId(userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard("jwt"))
  async findById(@Param() params: any): Promise<Campaign | null> {
      return this.campaignService.findById(params.id)
  }
}
