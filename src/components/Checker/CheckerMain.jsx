// src/components/Checker/CheckerMain.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import CheckerFirstStep from "./CheckerFirstStep";
import ChecklistSection from "./ChecklistSection";
import TimeOverForm from "./TimeOverForm";
import SendPage from "./SendPage";
import { startReport, completeReport } from "../../api"; // ← API追加
import "./styles/CheckerMain.css";

const CheckerMain = () => {
  const { user_id } = useParams();

  const [selectedPlace, setSelectedPlace] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  console.log("selectedStaff:", selectedStaff);
  const [selectedItems, setSelectedItems] = useState([]);
  const [photos, setPhotos] = useState({});
  const [timerStarted, setTimerStarted] = useState(false);
  const [timeOver, setTimeOver] = useState(false);
  const [showSendPage, setShowSendPage] = useState(false);
  const [limitTime, setLimitTime] = useState(180000); // デフォルト3分
  const [reportId, setReportId] = useState("");

  // ✅ 清掃開始
  const startChecklist = async () => {
    try {
      // 🔹 report ドキュメント作成
      const res = await startReport(user_id, selectedPlace, selectedStaff);
      setReportId(res.data.report_id);

      // 🔹 タスク取得（例：5件）
      const taskRes = await fetch(`/api/public/tasks?user_id=${user_id}&place_id=${selectedPlace}`);
      const taskData = await taskRes.json();

      setSelectedItems(taskData); // tasks
      const totalLimit = taskData.reduce((sum, item) => sum + (item.limit_time || 0), 0);
      setLimitTime(totalLimit * 60 * 1000);

      setTimerStarted(true);
      setShowSendPage(false);
    } catch (err) {
      console.error("清掃開始失敗", err);
    }
  };

// ✅ 完了処理（remarks を引数で受け取るよう変更）
const handleFinish = async (remarks = "") => {
  try {
    // チェック項目 + 写真URL を含む配列
    const items = selectedItems.map((item, index) => ({
      itemid: item.id,
      photourl: photos[index] || "",
    }));

    // 実際に送信された写真の数をカウント
    const reportedCount = items.filter(item => item.photourl).length;

    await completeReport(reportId, {
      timeover: timeOver,
      remarks,
      timelimit: Math.round(limitTime / 60000),
      items,
      reportedcount: reportedCount, // ここで送信数も登録
    });

    setTimerStarted(false);
    setShowSendPage(true);
  } catch (err) {
    console.error("報告送信失敗", err);
  }
};

  const reset = () => {
    setSelectedItems([]);
    setPhotos({});
    setTimerStarted(false);
    setTimeOver(false);
    setShowSendPage(false);
    setReportId("");
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

      {!timerStarted && !showSendPage ? (
        <CheckerFirstStep
          selectedPlace={selectedPlace}
          setSelectedPlace={setSelectedPlace}
          selectedStaff={selectedStaff}
          setSelectedStaff={setSelectedStaff}
          startChecklist={startChecklist}
        />
      ) : timeOver ? (
        <TimeOverForm
          reportId={reportId}
          items={selectedItems}
          photos={photos}
          limitTime={limitTime}
          onSubmitted={reset}
        />
      ) : showSendPage ? (
        <SendPage reportId={reportId} onSubmit={reset} />
      ) : (
        <ChecklistSection
          selectedItems={selectedItems}
          photos={photos}
          onPhotoUpload={handlePhotoUpload}
          onFinish={handleFinish}
          onTimeOver={() => setTimeOver(true)}
          limitTime={limitTime}
        />
      )}
    </div>
  );
};

export default CheckerMain;
