'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Geist, Geist_Mono } from "next/font/google";
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import '@ant-design/v5-patch-for-react-19';


const { Header, Content, Footer } = Layout;

import "./globals.css";
import { redirect } from "next/navigation";
import Link from "next/link";

const queryClient = new QueryClient();
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const items = [
    {
      key: "campaigns",
      label: <Link href="/campaigns">Campaigns</Link>,
    },
    {
      key: "register",
      label:  <Button
      size="middle"
      style={{
        backgroundColor: "#7E59ED",
        color: "white",
        fontWeight: "bold",
      }}
      onClick={() => redirect("/register")}
    >
      Sign Up
    </Button>,
    },
  {
    key: "login",
    label:  <Button
    size="middle"
    style={{
      backgroundColor: "#7E59ED",
      color: "white",
      fontWeight: "bold",
    }}
    onClick={() => redirect("/login")}
  >
    Login
  </Button>,
  },
  {
    key: "logout",
    label:  <Button
    size="middle"
    style={{
      backgroundColor: "#7E59ED",
      color: "white",
      fontWeight: "bold",
    }}
    onClick={() => {
      localStorage.clear()
      redirect("/login")
    }}
  >
    Logout
  </Button>,
  },
]
  return (
    <QueryClientProvider client={queryClient}>
    
      <html lang="en">
        <body
        
        >
             <Layout>
       <Header 
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#001529",
          padding: "0",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
       >
        <div className="demo-logo" />
        <Menu
          mode="horizontal"
          items={items}
          theme="light"
          defaultSelectedKeys={["1"]}
          style={{ flex: 1, minWidth: 0, justifyContent: "flex-end" }}
        />
      </Header>
      <Content
       style={{
        padding: "24px",
        margin: "24px auto",
        maxWidth: "1200px",
        width: "100%",
        minHeight: "80vh",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", 
      }}
      >
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Demo ©{new Date().getFullYear()} jkmigiro@gmail.com
      </Footer>
      </Layout>
        </body>
      </html>

      
    </QueryClientProvider>

  );
}
