'use client'
import {  useFetchCampaignsByUser } from "@/app/services/api";
import { Campaign } from "@/app/types/campaign";
import {
   Button, Spin, Alert, Space, Layout,
  Row,
  Col,
  Typography,
} from "antd";
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { format } from "date-fns";
import { EyeOutlined } from "@ant-design/icons";
import { useRouter } from 'next/navigation'
const { Title } = Typography
import dayjs from "dayjs";
export default function CampaignListComponent() {
  

  const { data: campaigns, isLoading, error } = useFetchCampaignsByUser(localStorage.getItem("userId"))
  const router = useRouter()
  if (isLoading) return <Spin size="large" />;
  if (error) return <Alert message="Failed to load campaigns" type="error" />;


  const columns: TableColumnsType<Campaign> = [
    {
      title: 'Name',
      dataIndex: 'name',
      showSorterTooltip: { target: 'full-header' },
      onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      sortDirections: ['descend'],
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      sorter: (a, b) => dayjs(a.deadline).unix() - dayjs(b.deadline).unix(),
      render: (deadline) => format(deadline, "MM/dd/yyyy"),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_: any, record: Campaign) => {
        return (
          <Space size={"middle"}>
            <EyeOutlined onClick={() => router.push(`/campaigns/${record._id}`)} />
          </Space>
        );
      },
    },
  ];

  return (
    <Layout style={{
      padding: "24px",
      margin: "24px auto",
      maxWidth: "1200px",
      width: "100%",
      minHeight: "80vh",
      background: "#fff",
      borderRadius: "8px"
    }}>
      <Row align="middle" justify="space-between">
        <Col span={12}>
          <Title level={3}>Campaigns</Title>
        </Col>
        <Col
          span={12}
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "end",
          }}
        >
          <Button
            size="middle"
            style={{
              backgroundColor: "#7E59ED",
              color: "white",
              fontWeight: "bold",
            }}
            onClick={() => router.push("/campaigns/new")}
          >
            Add campaign
          </Button>
        </Col>
      </Row>
      <Table<Campaign>
        columns={columns}
        dataSource={campaigns?.map((campaign) => ({
          ...campaign,
          key: campaign._id,
        }))}
        showSorterTooltip={{ target: 'sorter-icon' }}
      />
    </Layout>
  );
};





