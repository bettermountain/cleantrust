import React, { useState } from "react";
import {
  Typography,
  Button,
  TextField,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import "./styles/SendPage.css";
import { updateReportRemarks } from "../../api";

const SendPage = ({ reportId, onSubmit }) => {
  const [remarks, setRemarks] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updateReportRemarks(reportId, remarks);
      setSubmitted(true);
      setSnackbar({ open: true, message: "備考を送信しました", severity: "success" });
      onSubmit(); // ✅ 送信後にリセットなど
    } catch (err) {
      console.error("備考送信失敗", err);
      setSnackbar({ open: true, message: "備考の送信に失敗しました", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="send-page-container">
      <Typography variant="h5" className="send-title">備考入力</Typography>
      {!submitted ? (
        <>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="追加報告事項や写真不備の理由を記載"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="send-textfield"
          />
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            className="send-button"
            disabled={loading}
          >
            {loading ? "送信中..." : "報告を送信する"}
          </Button>
        </>
      ) : (
        <Typography variant="h6" className="send-confirmation">報告を送信しました。</Typography>
      )}

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
    </Box>
  );
};

export default SendPage;
