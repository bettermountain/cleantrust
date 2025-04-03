import React, { useState } from "react";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Tooltip, Divider, Paper, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link } from "react-router-dom";

const drawerWidth = 240;
const collapsedWidth = 60;

const StyledList = styled(List)({
    "& .MuiListItemButton-root": {
        paddingLeft: 24,
        paddingRight: 24,
        whiteSpace: "nowrap", // 文字が2列になるのを防ぐ
        overflow: "hidden",
    },
    "& .MuiListItemIcon-root": {
        minWidth: 0,
        marginRight: 16,
    },
    "& .MuiSvgIcon-root": {
        fontSize: 20,
    },
});

const theme = createTheme({
    components: {
        MuiListItemButton: {
            defaultProps: {
                disableTouchRipple: true,
            },
        },
    },
    palette: {
        mode: "dark",
        primary: { main: "rgb(102, 157, 246)" },
        background: { paper: "rgb(5, 30, 52)" },
    },
});

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <ThemeProvider theme={theme}>
            <Paper
                elevation={2}
                sx={{
                    width: isOpen ? drawerWidth : collapsedWidth,
                    transition: "width 0.3s",
                    overflowX: "hidden",
                    borderTopLeftRadius: 0, // 上部の丸みを削除
                    borderBottomLeftRadius: 0,
                }}
            >
                <StyledList component="nav" disablePadding>
                    <Divider />
                    <ListItemButton component={Link} to="/cleantrust/admin/tasklist">
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        {isOpen && <ListItemText primary="チェックリスト管理" />}
                    </ListItemButton>
                    <ListItemButton component={Link} to="/cleantrust/admin/reportlist">
                        <ListItemIcon>
                            <AssessmentIcon />
                        </ListItemIcon>
                        {isOpen && <ListItemText primary="報告確認" />}
                    </ListItemButton>
                    <ListItemButton component={Link} to="/cleantrust/admin/stafflist">
                        <ListItemIcon>
                            <PermIdentityIcon />
                        </ListItemIcon>
                        {isOpen && <ListItemText primary="スタッフ登録" />}
                    </ListItemButton>
                    <Divider />
                    <ListItem component="div" disablePadding>
                        <ListItemButton sx={{ height: 56 }}>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            {isOpen && <ListItemText primary="設定" />}
                            <Tooltip title="詳細設定">
                                <IconButton
                                    size="large"
                                    sx={{
                                        "& svg": {
                                            color: "rgba(255,255,255,0.8)",
                                            transition: "0.2s",
                                        },
                                        "&:hover, &:focus": {
                                            bgcolor: "unset",
                                            "& svg:first-of-type": {
                                                transform: "translateX(-4px) rotate(-20deg)",
                                            },
                                            "& svg:last-of-type": {
                                                right: 0,
                                                opacity: 1,
                                            },
                                        },
                                    }}
                                >
                                    <ArrowRightIcon />
                                </IconButton>
                            </Tooltip>
                        </ListItemButton>
                    </ListItem>
                </StyledList>
            </Paper>
        </ThemeProvider>
    );
};

export default Sidebar;
