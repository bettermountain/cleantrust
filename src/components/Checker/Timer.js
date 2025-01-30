import React from "react";
import { Typography } from "@mui/material";

export const Timer = ({ date, renderer }) => (
  <Typography>
    {renderer({ minutes: 0, seconds: 30, completed: false }) || date}
  </Typography>
);
