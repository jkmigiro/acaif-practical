'use client'
import { Breadcrumb, Button, Card, Layout, Menu, theme } from 'antd';
import '@ant-design/v5-patch-for-react-19';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';


const { Header, Content, Footer } = Layout;

export default function CampaignLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
      const path = usePathname().substring(1)
      console.log("Param name: ",path)

   return(
    <Layout style={{
      padding: "24px",
      margin: "24px auto",
      maxWidth: "1200px",
      width: "100%",
      background: "#fff",
      borderRadius: "8px"
    }}>
      {children}
    </Layout>
   )
  }