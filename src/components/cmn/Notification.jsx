// src/components/common/Notification.js

import React from "react";
import { Snackbar, Alert } from "@mui/material";

const Notification = ({ open, message, type = "success", onClose }) => {
    if (!message) return null;

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={onClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert onClose={onClose} severity={type} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Notification;
