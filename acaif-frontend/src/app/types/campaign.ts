export enum CampaignStatus{
  "Active",
  "Completed"
}

export interface Campaign {
  _id?: string;
  key?: string;
  userId?: string | null;
  name: string;
  description: string;
  status: CampaignStatus;
  deadline: Date; 
  content: string;
  createdAt:Date;
  updatedAt?:Date;
}

export interface Submission {
  _id?: string;
  campaignId?: string;
  userId?: string;
  createdAt: Date;
  updatedAt?:Date;
}

export interface PerformanceMetric{
  campaignId?: string;
  userId?: string;
  totalPosts: number;
  likes: number;
  comments: string[];
  updatedAt:Date
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

