import { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import "../style/styles.css";

const FrameAdmin = ({ user, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* ✅ user と onLogout を渡す */}
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} user={user} onLogout={onLogout} />
      <Box sx={{ display: "flex", flexGrow: 1, marginTop: "64px" }}>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <Box sx={{ flexGrow: 1, padding: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default FrameAdmin;
