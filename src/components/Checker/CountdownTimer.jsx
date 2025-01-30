import React from "react";
import Countdown from "react-countdown";
import { Typography } from "@mui/material";
import "./styles/CountdownTimer.css"; // スタイルを適用

const CountdownTimer = ({ onComplete }) => {
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      onComplete();
      return <Typography className="countdown-expired" variant="h6">タイムオーバー</Typography>;
    }

    // 2桁表示にするために `padStart(2, '0')` を適用
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return <div className="countdown-box">{formattedMinutes}:{formattedSeconds}</div>;
  };

  return <Countdown date={Date.now() + 500000} renderer={renderer} />;
};

export default CountdownTimer;
