import React, { useState } from "react";
import { Typography, Button, TextField, Box } from "@mui/material";
import "./styles/SendPage.css";

const SendPage = ({ onSubmit }) => {
  const [remarks, setRemarks] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    console.log("報告を送信しました");
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
