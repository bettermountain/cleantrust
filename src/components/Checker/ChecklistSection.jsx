import React from "react";
import { Button, Box } from "@mui/material";
import CountdownTimer from "./CountdownTimer";
import ChecklistItem from "./ChecklistItem";
import "./styles/ChecklistSection.css"; // スタイルを適用

const ChecklistSection = ({ selectedItems, photos, onPhotoUpload, onFinish, onTimeOver }) => {
  return (
    <div className="checklist-section">
      <CountdownTimer onComplete={onTimeOver} />

      {/* スクロール可能なチェックリスト */}
      <Box className="checklist-scrollable">
        <div className="checklist-container">
          {selectedItems.map((item, index) => (
            <ChecklistItem
              key={index}
              item={item}
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
