import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Campaign, CampaignStatus, User, PerformanceMetric, Submission } from "../types/campaign";
import { faker } from '@faker-js/faker';
import { Caladea } from "next/font/google";
import { message } from "antd";
import { redirect } from "next/navigation";
import api from "./axiosInstance";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

//Get all campaigns
export const useFetchCampaigns = () => {
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const response = await api.get<Campaign[]>(`${API_BASE_URL}/campaigns`);
      return response.data;
    },
  });
};

//Get campaigns for a specific user
export const useFetchCampaignsByUser = (userId: string | null) => {
  return useQuery({
    queryKey: ["campaignsByuser"],
    queryFn: async () => {
      const response = await api.get<Campaign[]>(`${API_BASE_URL}/campaigns/user`, {
        params: { userId: userId }
      });
      return response.data;
    },
  });
};

// Fetch single campaign details
export const useFetchCampaignDetails = (id?: string) => {
  return useQuery({
    queryKey: ["campaign", id],
    queryFn: async () => {
      if (!id) throw new Error("No campaign ID provided");
      const response = await api.get<Campaign>(`${API_BASE_URL}/campaigns/${id}`);
      return response.data;
    },
    enabled: !!id, 
  });
};


export const useSubmitCampaignContent = (campaignId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content) => {
      if (!campaignId) throw new Error("No campaign ID provided");
      const response = await api.post<Campaign>(`${API_BASE_URL}/campaigns/`, content);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaign", campaignId] });
    },
  });
};

// Submit campaign content
export const useSubmitCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: Campaign) => {
      if (!localStorage.getItem("user")) {
        message.error("No user logged in.")
        throw new Error("User not found.")
      }

      content.userId = localStorage.getItem("userId")
      const response = await api.post<Campaign>(`${API_BASE_URL}/campaigns/`, content)
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: { link: string }) => {
      const response = await api.post<Campaign>(`${API_BASE_URL}/users`, content);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await api.post(`${API_BASE_URL}/auth/login`, data);
      return response.data;
    },
    onSuccess: (data) => {
      // Fetch campaigns list
      message.success("Login successful!");
      localStorage.setItem("user", JSON.stringify(data))
      localStorage.setItem("userId", data._id)
      localStorage.setItem("token", data.token)
      // Redirect after login
    },
    onError: (error) => {
      message.error("Invalid credentials. Please try again.");
    },

  })
};



const generateuser = (): User => {
  return {
    _id: faker.database.mongodbObjectId(),
    name: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    createdAt: faker.date.recent()
  }
}
const enumArray = Object.keys(CampaignStatus).map(key => key)

const generateCampaign = (): Campaign => {
  return {
    _id: faker.database.mongodbObjectId(),
    key: faker.database.mongodbObjectId(),
    name: faker.commerce.product(),
    description: faker.company.catchPhrase(),
    status: CampaignStatus[enumArray[Math.floor(Math.random() * (2 - 0 + 1)) + 0] as keyof typeof CampaignStatus],
    deadline: faker.date.future(),
    content: faker.string.sample(),
    createdAt: faker.date.recent()
  }
}

const generateSubmission = (): Submission => {
  return {
    _id: faker.database.mongodbObjectId(),
    campaignId: generateCampaign()._id,
    userId: generateuser()._id,
    createdAt: faker.date.recent()
  }
}

const generatePerformanceMetric = (): PerformanceMetric => {
  return {
    campaignId: generateCampaign()._id,
    userId: generateuser()._id,
    totalPosts: faker.number.int({ min: 50, max: 100 }),
    likes: faker.number.int({ min: 10, max: 50 }),
    comments: Array.from({ length: Math.floor(Math.random() * (5 - 0 + 1)) + 0 }, faker.string.sample),
    updatedAt: faker.date.recent()
  }
}