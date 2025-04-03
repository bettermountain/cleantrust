import React, { useState } from "react";
import { Typography, Button, TextField, Box } from "@mui/material";
import "./styles/SendPage.css";
import { updateReportRemarks } from "../../api"; // 🔹 追記

const SendPage = ({ reportId, onSubmit }) => {
  const [remarks, setRemarks] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    try {
      await updateReportRemarks(reportId, remarks);
      setSubmitted(true);
      console.log("備考を送信しました");
      onSubmit(); // ✅ 送信後にリセットなど
    } catch (err) {
      console.error("備考送信失敗", err);
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
            label="備考"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="send-textfield"
          />
          <Button onClick={handleSubmit} color="primary" variant="contained" className="send-button">
            報告を送信する
          </Button>
        </>
      ) : (
        <Typography variant="h6" className="send-confirmation">報告を送信しました。</Typography>
      )}
    </Box>
  );
};

export default SendPage;
