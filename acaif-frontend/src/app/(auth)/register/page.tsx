'use client'
import { Alert, Button, Form, FormProps, Input, message } from "antd";
import { useCreateUser } from "@/app/services/api";
import { useCallback, useState } from "react";

const CreateUser: React.FC = () => {
  const [form] = Form.useForm();
  const [isPending, setIsPending] = useState<boolean>(false)
  const registerMutation = useCreateUser();
  // Handle form submission
  const onFinish = (values) => {
    setIsPending(true)
    registerMutation.mutate(values, {
      onSuccess: (data) => {
        message.success("Submission successful!")
        setIsPending(false)
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(data))
          if (data._id) {
            localStorage.setItem("userId", data._id)
          }
        };

      },
      onError: () => message.error("Failed to submit."),
    });


  };

  const onFinishFailed: FormProps["onFinishFailed"] = useCallback(
    () => {
      return <Alert message="Failed to submit details" type="error" />;
    },
    [],
  );

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item
        label="Full Name"
        name="name"
        rules={[{ required: true, message: "Please enter your name" }]}
      >
        <Input placeholder="Enter full name" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please enter an email" },
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
        <Input type="password" placeholder="password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isPending}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateUser;
