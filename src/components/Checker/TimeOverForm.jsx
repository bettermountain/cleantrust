import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import "./styles/TimeOverForm.css";
import { completeReport } from "../../api";

const TimeOverForm = ({ reportId, items, photos, limitTime, onSubmitted }) => {
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payloadItems = items.map((item, index) => ({
        itemid: item.id,
        photourl: photos[index] || "",
      }));

      const reportedcount = payloadItems.filter(item => item.photourl !== "").length;

      await completeReport(reportId, {
        timeover: true,
        remarks,
        timelimit: Math.round(limitTime / 60000),
        items: payloadItems,
        reportedcount,
      });

      setSnackbar({ open: true, message: "報告を送信しました", severity: "success" });
      onSubmitted(); // 完了後の処理
    } catch (err) {
      console.error("タイムオーバー報告送信失敗", err);
      setSnackbar({ open: true, message: "送信に失敗しました", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="timeover-container">
      <Box className="timeover-input-area">
        <TextField
          className="timeover-textarea"
          label="タイムオーバーとなった理由"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
        <Box className="timeover-input-space" />
        <Button
          className="reset-button"
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "送信中..." : "報告を送信する"}
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TimeOverForm;
