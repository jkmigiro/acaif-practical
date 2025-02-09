'use client'
import { useParams, useRouter } from "next/navigation";
import { Card, Button, Form, Input, message, Spin, Alert, DatePicker, Select } from "antd";
import { useFetchCampaignDetails, useSubmitCampaignContent } from "@/app/services/api";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const layout = {
  labelCol: { span: 2},
  wrapperCol: { span: 12 },
};
export default function CampaignItemComponent() {
  const router = useRouter()
  const { id } = useParams()
  const [form] = Form.useForm();

  const { data: campaign, isLoading, error } = useFetchCampaignDetails(id as string);
  const submitMutation = useSubmitCampaignContent(id as string);
  const [current, setCurrent] = useState(campaign)
  const onSubmit = (values) => {
    values.deadline= values.deadline?.$d
    values._id=current?._id
    submitMutation.mutate(values, {
      onSuccess: () => {
        message.success("Submission successful!")
        setCurrent(values)
        router.push("/campaigns")
      },
      onError: () => message.error("Failed to submit."),
    });
  };
  useEffect(() => {
    if(isLoading === false){
      form.setFieldsValue({
        _id: campaign?._id,
        name: campaign?.name,
        status: campaign?.status,
        description: campaign?.description,
        content: campaign?.content,
        deadline: dayjs(campaign?.deadline),
        createdAt: dayjs(campaign?.createdAt),
        updatedAt: dayjs(campaign?.updatedAt),
      })
    }

    setCurrent(campaign)
  },[isLoading,campaign,form])

  return (
    <div>
      {isLoading ? <Spin size="large" />: <Card title={current?.name}>
      <Form 
       {...layout} 
      form={form} 
      onFinish={onSubmit} >
        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Campaign name is required." }]}>
          <Input placeholder="Enter the campaign name" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input placeholder="Enter the campaign description" />
        </Form.Item>
        <Form.Item label="Content" name="content">
          <Input.TextArea placeholder="Enter the campaign content e.g. Instagram post link" />
        </Form.Item>
        <Form.Item label="Deadline" name="deadline">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Select options={[{value:"Active",label:"Active"},{value:"Completed",label:"Completed"}]}/>
        </Form.Item >
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" loading={submitMutation.isPending}>Submit</Button>
        </Form.Item >

      </Form>
    </Card>}
    {error && (<Alert message="Failed to load campaign details" type="error" />)}
    </div>
    
  );
};


