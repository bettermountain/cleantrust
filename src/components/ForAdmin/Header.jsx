import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = ({ toggleSidebar }) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={toggleSidebar} sx={{ marginRight: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">管理システム</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
