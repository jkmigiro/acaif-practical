import { Layout } from "antd";
import CampaignListComponent from "./page";

export default function CampaignLayout() {
   return (
      <Layout   style={{
         padding: "24px",
         margin: "24px auto",
         maxWidth: "1200px",
         width: "100%",
         minHeight: "80vh",
         background: "#fff",
         borderRadius: "8px"
       }}>
         <CampaignListComponent/>
      </Layout>
   )
  }

