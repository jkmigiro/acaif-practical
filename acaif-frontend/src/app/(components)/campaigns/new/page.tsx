'use client'
import { useCallback, useState } from "react";
import { Button, Form, Input, DatePicker, Select, message, FormProps, Alert, Card } from "antd";
import { useSubmitCampaign } from "@/app/services/api";
import {  useRouter } from "next/navigation";

const { Option } = Select;

const CreateCampaignComponent: React.FC = () => {

    const router=useRouter()
    const [form] = Form.useForm()
    const [isPending, setIsPending] = useState<boolean>(false)
    const newCampaignMutation=useSubmitCampaign()
    // Handle form submission
    const onFinish = (values) => {
        const formattedData = {
            ...values,
            deadline: values.deadline?.$d
        };
        setIsPending(true)
        newCampaignMutation.mutate(formattedData, {
        onSuccess: () => {
          message.success("Submission successful!")
          setIsPending(false)
          router.push("/campaigns")
        },
        onError: () => {
            setIsPending(false)
            message.error("Submission failed")
        },
      });
       

    };
    const onFinishFailed: FormProps["onFinishFailed"] = useCallback(
        () => {
            return <Alert message="Failed to submit details" type="error" />;
        },
        [],
    );

    return (
        <Card title="New campaign">
            <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{ paddingBlock: 32 }}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            scrollToFirstError={{ behavior: 'instant', block: 'end', focus: true }}
        >
            <Form.Item
                label="Campaign Name"
                name="name"
                rules={[{ required: true, message: "Please enter a campaign name" }]}
            >
                <Input placeholder="Enter campaign name" />
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: "Please enter a description" }]}
            >
                <Input.TextArea placeholder="Enter campaign description" rows={4} />
            </Form.Item>

            <Form.Item
                label="Deadline"
                name="deadline"
                rules={[{ required: true, message: "Please select a deadline" }]}
            >
                <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: "Please select a status" }]}
            >
                <Select placeholder="Select status">
                    <Option value="Active">Active</Option>
                    <Option value="Completed">Completed</Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isPending}>
                    Create Campaign
                </Button>
            </Form.Item>
        </Form>
        </Card>
    );
};

export default CreateCampaignComponent;
