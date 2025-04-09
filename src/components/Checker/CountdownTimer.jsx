// src/components/Checker/CountdownTimer.jsx
import React from "react";
import Countdown from "react-countdown";
import { Typography } from "@mui/material";
import "./styles/CountdownTimer.css";

const CountdownTimer = ({ totalLimitTime, onComplete }) => {
  if (!totalLimitTime || totalLimitTime <= 0) {
    return (
      <Typography className="countdown-waiting" variant="body1">
        タイマーを準備中...
      </Typography>
    );
  }

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      onComplete();
      return <Typography className="countdown-expired" variant="h6">タイムオーバー</Typography>;
    }

    return (
      <div className="countdown-box">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
    );
  };

  return <Countdown date={Date.now() + totalLimitTime} renderer={renderer} />;
};

export default CountdownTimer;
