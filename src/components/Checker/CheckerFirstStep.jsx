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
} from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchPublicStaffs } from "../../api";
import "./styles/CheckerFirstStep.css";

const CheckerFirstStep = ({
  selectedPlace,
  setSelectedPlace,
  selectedStaff,
  setSelectedStaff,
  startChecklist,
}) => {
  const [currentDate, setCurrentDate] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [places, setPlaces] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const { user_id } = useParams();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchPublicStaffs(user_id);
        setStaffs(res.data);
      } catch (err) {
        console.error("スタッフ取得失敗", err);
      }
    };
    load();
  }, [user_id]);

  useEffect(() => {
    const today = new Date();
    setCurrentDate(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`);
  }, []);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/public/places?user_id=${user_id}`);
        const data = await res.json();
        setPlaces(data);
      } catch (err) {
        console.error("物件取得失敗", err);
      }
    };
    fetchPlaces();
  }, [user_id]);

  const handleStartClick = () => {
    if (selectedPlace && selectedStaff) {
      setOpenModal(true);
    }
  };

  const handleConfirmStart = () => {
    setOpenModal(false);
    startChecklist();
  };

  return (
    <div className="checker-first-container">
      <Box className="checker-input-box">
        <Typography className="date-text">日付: {currentDate}</Typography>

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
      </Box>

      {/* 確認モーダル */}
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
