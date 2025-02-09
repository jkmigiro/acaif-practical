'use client'
import { Layout } from 'antd';
import '@ant-design/v5-patch-for-react-19';
import {  usePathname } from 'next/navigation';

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