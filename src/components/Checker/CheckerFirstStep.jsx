import React, { useState ,useEffect} from "react";
import { Button, MenuItem, Select, FormControl ,Typography, Box } from "@mui/material";
import { properties } from "../../data/properties";
import "./styles/CheckerFirstStep.css"; // CSSをインポート

const CheckerFirstStep = ({ startChecklist }) => {
  const [selectedProperty, setSelectedProperty] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    const today = new Date();
    setCurrentDate(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`);
  }, []);

  return (
    <div className="checker-first-container">
      <Box className="checker-input-box">
        <Typography className="date-text">日付: {currentDate}</Typography>
        <FormControl className="select-box" fullWidth>
          <Select
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
          >
            {properties.map((property, index) => (
              <MenuItem key={index} value={property}>
                {property}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box className="checker-space-underselect"/>
        <Button
          className="start-button"
          variant="contained"
          onClick={() => startChecklist()}
        >
          清掃報告を開始する
        </Button>
      </Box>
    </div>
  );
};

export default CheckerFirstStep;
