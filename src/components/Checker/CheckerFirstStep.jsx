import React, { useState, useEffect } from "react";
import { Button, MenuItem, Select, FormControl, Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { properties } from "../../data/properties";
import "./styles/CheckerFirstStep.css";

const CheckerFirstStep = ({ startChecklist }) => {
  const [selectedProperty, setSelectedProperty] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const today = new Date();
    setCurrentDate(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`);
  }, []);

  const handleStartClick = () => {
    setOpenModal(true);
  };

  const handleConfirmStart = () => {
    setOpenModal(false);
    startChecklist();
  };

  return (
    <div className="checker-first-container">
      <Box className="checker-input-box">
        <Typography className="date-text">日付: {currentDate}</Typography>
        <FormControl className="select-box" fullWidth>
          <Select value={selectedProperty} onChange={(e) => setSelectedProperty(e.target.value)}>
            {properties.map((property, index) => (
              <MenuItem key={index} value={property}>
                {property}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box className="checker-space-underselect" />
        <Button className="start-button" variant="contained" onClick={handleStartClick}>
          清掃報告を開始する
        </Button>
      </Box>

      {/* 確認モーダル */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>確認</DialogTitle>
        <DialogContent>
          <Typography>タイマーがスタートします。</Typography>
          <Typography>制限時間は3分です。</Typography>
          <Typography>※ブラウザの戻るボタンやリロードは使用しないでください。</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="secondary">
            キャンセル
          </Button>
          <Button onClick={handleConfirmStart} color="primary" variant="contained">
            開始する
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CheckerFirstStep;
