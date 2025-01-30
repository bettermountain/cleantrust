import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { cleaningItems } from "../../data/cleaningItems";
import CheckerFirstStep from "./CheckerFirstStep";
import ChecklistSection from "./ChecklistSection";
import TimeOverForm from "./TimeOverForm";
import "./styles/CheckerMain.css";

const CheckerMain = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [photos, setPhotos] = useState({});
  const [timerStarted, setTimerStarted] = useState(false);
  const [timeOver, setTimeOver] = useState(false);

  const startChecklist = () => {
    const shuffled = cleaningItems.sort(() => 0.5 - Math.random());
    setSelectedItems(shuffled.slice(0, 5));
    setPhotos({});
    setTimerStarted(true);
  };

  const reset = () => {
    setSelectedItems([]);
    setPhotos({});
    setTimerStarted(false);
    setTimeOver(false);
  };

  const finish = () => {
    console.log("清掃完了");
  };

  const handlePhotoUpload = (index, event) => {
    const file = event.target.files[0];
    setPhotos((prevPhotos) => ({
      ...prevPhotos,
      [index]: URL.createObjectURL(file),
    }));
  };

  return (
    <div className="checker-container">
      <div className="checklist-header">
        <Typography variant="h4">清掃報告</Typography>
      </div>

      {!timerStarted ? (
        <CheckerFirstStep startChecklist={startChecklist} />
      ) : timeOver ? (
        <TimeOverForm onReset={reset} />
      ) : (
        <ChecklistSection
          selectedItems={selectedItems}
          photos={photos}
          onPhotoUpload={handlePhotoUpload}
          onFinish={finish}
          onTimeOver={() => setTimeOver(true)}
        />
      )}
    </div>
  );
};

export default CheckerMain;
