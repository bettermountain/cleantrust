import React from "react";
import { Button, TextField , Box} from "@mui/material";
import "./styles/TimeOverForm.css"; // スタイルを適用

const TimeOverForm = ({ onReset }) => {
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
        />
        <Box className="timeover-input-space"/>
        <Button className="reset-button" variant="contained" onClick={onReset}>
          リセット
        </Button>
      </Box>
    </div>
  );
};

export default TimeOverForm;
