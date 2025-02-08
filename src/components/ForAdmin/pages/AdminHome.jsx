import { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import "../style/styles.css";

const AdminHome = ({ user }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // ✅ 初期状態は開いている

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* ヘッダー */}
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* メインコンテンツ（Headerの高さ分マージンを確保） */}
      <Box sx={{ display: "flex", flexGrow: 1, marginTop: "64px" }}>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <Box sx={{ flexGrow: 1, padding: 3 }}>
          <Outlet /> {/* ✅ ここが隠れないように調整 */}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminHome;
