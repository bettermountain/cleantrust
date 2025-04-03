// src/components/Checker/ChecklistSection.jsx
import React from "react";
import { Button, Box } from "@mui/material";
import CountdownTimer from "./CountdownTimer";
import ChecklistItem from "./ChecklistItem";
import "./styles/ChecklistSection.css";

const ChecklistSection = ({ selectedItems, photos, onPhotoUpload, onFinish, onTimeOver, totalLimitTime }) => {
  return (
    <div className="checklist-section">
      <CountdownTimer totalLimitTime={totalLimitTime} onComplete={onTimeOver} />

      <Box className="checklist-scrollable">
        <div className="checklist-container">
          {selectedItems.map((item, index) => (
            <ChecklistItem
              key={index}
              item={item.itemtext}
              index={index}
              photo={photos[index]}
              onPhotoUpload={(e) => onPhotoUpload(index, e)}
            />
          ))}
        </div>
      </Box>

      <Button className="finish-button" variant="contained" onClick={onFinish}>
        清掃完了
      </Button>
    </div>
  );
};

export default ChecklistSection;
