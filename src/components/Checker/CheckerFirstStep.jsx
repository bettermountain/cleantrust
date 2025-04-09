// src/components/Checker/CheckerFirstStep.jsx
import React, { useState, useEffect } from "react";
import {
  Button,
  MenuItem,
  Select,
  FormControl,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchPublicStaffs, fetchPublicPlaces } from "../../api";
import "./styles/CheckerFirstStep.css";

const CheckerFirstStep = ({
  selectedPlace,
  setSelectedPlace,
  selectedStaff,
  setSelectedStaff,
  startChecklist,
}) => {
  const { user_id } = useParams();
  const [currentDate, setCurrentDate] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [places, setPlaces] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date();
    setCurrentDate(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const staffRes = await fetchPublicStaffs(user_id);
        const placeRes = await fetchPublicPlaces(user_id);
        setStaffs(staffRes.data);
        setPlaces(placeRes);
      } catch (err) {
        console.error("データ取得失敗", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [user_id]);

  const handleStartClick = () => {
    if (selectedPlace && selectedStaff) setOpenModal(true);
  };

  const handleConfirmStart = () => {
    setOpenModal(false);
    startChecklist();
  };

  return (
    <div className="checker-first-container">
      <Box className="checker-input-box">
        <Typography className="date-text">日付: {currentDate}</Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>物件を選択</InputLabel>
              <Select
                value={selectedPlace}
                onChange={(e) => setSelectedPlace(e.target.value)}
                label="物件を選択"
                className="select-box"
              >
                {places.map((place) => (
                  <MenuItem key={place.id} value={place.id}>
                    {place.placename}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>スタッフを選択</InputLabel>
              <Select
                value={selectedStaff}
                onChange={(e) => setSelectedStaff(e.target.value)}
                label="スタッフを選択"
                className="select-box"
              >
                {staffs.map((staff) => (
                  <MenuItem key={staff.id} value={staff.id}>
                    {staff.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div className="checker-space-underselect" />

            <Button
              variant="contained"
              onClick={handleStartClick}
              className="start-button"
              disabled={!selectedPlace || !selectedStaff}
            >
              清掃報告を開始する
            </Button>
          </>
        )}
      </Box>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>確認</DialogTitle>
        <DialogContent>
          <Typography>タイマーがスタートします。</Typography>
          <Typography>時間内にチェックを完了してください。</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="secondary">
            キャンセル
          </Button>
          <Button onClick={handleConfirmStart} variant="contained" color="primary">
            開始する
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CheckerFirstStep;
