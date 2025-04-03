import { AppBar, Toolbar, IconButton, Typography, Box, Menu, MenuItem, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";

const Header = ({ toggleSidebar, user, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    handleMenuClose();
    onLogout();
  };

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* 左側：メニューとタイトル */}
        <Box display="flex" alignItems="center">
          <IconButton edge="start" color="inherit" onClick={toggleSidebar} sx={{ marginRight: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">CleanTrust</Typography>
        </Box>

        {/* 右側：ユーザー名と歯車アイコン */}
        {user && (
          <Box display="flex" alignItems="center">
            <Typography variant="body1" sx={{ color: "#fff", marginRight: 1 }}>
              {user.username}
            </Typography>

            <Tooltip title="設定メニュー">
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <SettingsIcon />
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
