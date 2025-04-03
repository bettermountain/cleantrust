import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import "./styles/TimeOverForm.css";
import { completeReport } from "../../api";

const TimeOverForm = ({ reportId, items, photos, limitTime, onSubmitted }) => {
  const [remarks, setRemarks] = useState("");

  const handleSubmit = async () => {
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
        reportedcount, // ✅ 画像があるものだけカウント
      });
  
      onSubmitted(); // 完了後の処理
    } catch (err) {
      console.error("タイムオーバー報告送信失敗", err);
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
        <Button className="reset-button" variant="contained" onClick={handleSubmit}>
          報告を送信する
        </Button>
      </Box>
    </div>
  );
};

export default TimeOverForm;
