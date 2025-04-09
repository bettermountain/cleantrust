// src/components/Checker/ChecklistSection.jsx
import React from "react";
import { Button, Box } from "@mui/material";
import CountdownTimer from "./CountdownTimer";
import ChecklistItem from "./ChecklistItem";
import "./styles/ChecklistSection.css";

const ChecklistSection = ({ selectedItems, photos, onPhotoUpload, onFinish, onTimeOver, totalLimitTime }) => {
  return (
    <div className="checklist-section">
      {/* タイマー */}
      <CountdownTimer totalLimitTime={totalLimitTime} onComplete={onTimeOver} />

      {/* チェックリスト本体 */}
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

      {/* 完了ボタン */}
      <Button
        className="finish-button"
        variant="contained"
        onClick={() => onFinish("")} // remarks を空文字で明示的に渡す
      >
        清掃完了
      </Button>
    </div>
  );
};

export default ChecklistSection;
