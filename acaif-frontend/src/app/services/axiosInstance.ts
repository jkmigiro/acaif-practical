import { message } from "antd";
import axios from "axios";
import { redirect } from "next/navigation";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
});

//api interceptor
api.interceptors.request.use(
  (config) => {
    let token: string|null|undefined;
    if (typeof window !== "undefined"){
       token = localStorage.getItem("token");
    };

    if (!config.url?.includes("/auth/login") && !config.url?.includes("/users") && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
    //  console.error("Unauthorized! Redirecting to login...");
      message.error("Please log in")
      if (typeof window !== "undefined"){
        localStorage.removeItem("token");
     };
      redirect("/login")
    }
    return Promise.reject(error);
  }
);

export default api;
