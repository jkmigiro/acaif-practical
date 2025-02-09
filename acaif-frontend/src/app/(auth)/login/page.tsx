"use client";

import { Button, Form, Input, message, Card } from "antd";
import {  useRouter } from "next/navigation";
import { useState } from "react";
import { useLogin } from "@/app/services/api";

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const loginMutation=useLogin()

  const onFinish = (values: { email: string; password: string }) => {
    setLoading(true);
    loginMutation.mutate(values, {
      onSuccess: () => {
        message.success("Submission successful!")
        setLoading(false)
        router.push("/campaigns")
      },
      onError: () => {
        message.error("Failed to submit.")
        setLoading(false)
      },
      
      
    });
  };


  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-96 shadow-lg">
        <h2 className="text-center text-xl font-semibold mb-4">Login</h2>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
