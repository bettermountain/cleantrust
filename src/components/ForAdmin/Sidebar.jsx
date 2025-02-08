import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, useMediaQuery, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const isMobile = useMediaQuery("(max-width: 900px)"); // ✅ 画面サイズをチェック

    return (
        <Drawer
            variant={isMobile ? "temporary" : "persistent"}
            open={true}
            // onClose={toggleSidebar}
            sx={{
                width: isOpen ? 240 : 60, // ✅ 閉じているときは 60px
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: isOpen ? 240 : 60, // ✅ 閉じているときは 60px
                    transition: "width 0.3s",
                    overflowX: "hidden",
                    marginTop: "64px", // ✅ ヘッダーの下に配置
                },
            }}
        >
            <List>
                <ListItem button component={Link} to="/cleantrust/admin/task-management" onClick={isMobile ? toggleSidebar : undefined}>
                    <ListItemIcon><AssignmentIcon /></ListItemIcon>
                    {isOpen && <ListItemText primary="チェックリスト管理" />}
                </ListItem>
                <ListItem button component={Link} to="/cleantrust/admin/report-list" onClick={isMobile ? toggleSidebar : undefined}>
                    <ListItemIcon><AssessmentIcon /></ListItemIcon>
                    {isOpen && <ListItemText primary="報告確認" />}
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
