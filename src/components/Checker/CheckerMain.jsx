// src/components/Checker/CheckerMain.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Snackbar, Alert, CircularProgress } from "@mui/material";
import CheckerFirstStep from "./CheckerFirstStep";
import ChecklistSection from "./ChecklistSection";
import TimeOverForm from "./TimeOverForm";
import SendPage from "./SendPage";
import { startReport, completeReport, fetchPublicTasks,uploadPhoto } from "../../api"; // ← API追加
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase"; // firebase.jsの場所
import "./styles/CheckerMain.css";

const CheckerMain = () => {
  const { user_id } = useParams();

  const [selectedPlace, setSelectedPlace] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [photos, setPhotos] = useState({});
  const [timerStarted, setTimerStarted] = useState(false);
  const [timeOver, setTimeOver] = useState(false);
  const [showSendPage, setShowSendPage] = useState(false);
  const [limitTime, setLimitTime] = useState(0);
  const [reportId, setReportId] = useState("");

  // ローディング＆通知
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  // ✅ 清掃開始
  const startChecklist = async () => {
    setLoading(true);
    try {
      const res = await startReport(user_id, selectedPlace, selectedStaff);
      setReportId(res.data.report_id);
      const taskData = await fetchPublicTasks(user_id, selectedPlace);
      setSelectedItems(taskData);
      const totalLimit = taskData.reduce((sum, item) => sum + (item.limit_time || 0), 0);
      setLimitTime(totalLimit * 60 * 1000);
      setTimerStarted(true);
      setShowSendPage(false);
      showSnackbar("清掃を開始しました！");
    } catch (err) {
      console.error("清掃開始失敗", err);
      showSnackbar("清掃開始に失敗しました", "error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ 完了処理（remarks を引数で受け取る）
  const handleFinish = async (remarks = "") => {
    setLoading(true);
    try {
      const items = selectedItems.map((item, index) => ({
        itemid: item.id,
        photourl: typeof photos[index] === "string" ? photos[index] : "",
      }));
      const reportedCount = items.filter(item => item.photourl).length;

      await completeReport(reportId, {
        timeOver,
        remarks,
        timelimit: Math.round(limitTime / 60000),
        items,
        reportedcount: reportedCount,
      });

      setTimerStarted(false);
      setShowSendPage(true);
      showSnackbar("清掃報告を送信しました！");
    } catch (err) {
      console.error("報告送信失敗", err);
      showSnackbar("清掃報告送信に失敗しました", "error");
    } finally {
      setLoading(false);
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

  // アップロード関数
  const uploadImageToFirebase = async (file, index) => {
    const filename = `reports/${reportId}/photo-${index}-${Date.now()}`;
    const fileRef = ref(storage, filename);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  };

  const resizeImage = (file, maxSize = 1000) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const canvas = document.createElement("canvas");
      const reader = new FileReader();
  
      reader.onload = (e) => {
        img.src = e.target.result;
      };
  
      img.onload = () => {
        const scale = Math.min(maxSize / img.width, maxSize / img.height);
        const width = img.width * scale;
        const height = img.height * scale;
  
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
  
        canvas.toBlob(
          (blob) => {
            resolve(new File([blob], file.name, { type: "image/jpeg" }));
          },
          "image/jpeg",
          0.7 // ← 圧縮率（0.0〜1.0）
        );
      };
  
      img.onerror = reject;
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  
  const handlePhotoUpload = async (index, event) => {  
    const file = event?.target?.files?.[0]; // nullチェック含む
    if (!file) {
      console.warn("⚠️ ファイルが存在しません");
      return;
    }
  
    try {
      const compressedFile = await resizeImage(file); // ← 追加
      const url = await uploadPhoto(reportId, index, compressedFile); // ← 圧縮後に送信
      setPhotos(prev => ({ ...prev, [index]: url }));
      showSnackbar(`写真 ${index + 1} をアップロードしました`);
    } catch (err) {
      console.error("❌ アップロード失敗", err);
      showSnackbar(`写真 ${index + 1} のアップロードに失敗しました`, "error");
    }
  };

  return (
    <div className="checker-container">
      <div className="checklist-header">
        <Typography variant="h4">清掃報告</Typography>
      </div>

      {/* ✅ グローバルローディングオーバーレイ */}
      {loading && (
        <div className="loading-overlay">
          <CircularProgress size={60} thickness={5} />
        </div>
      )}
      {!timerStarted && !showSendPage && !loading ? (
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
          totalLimitTime={limitTime}
        />
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} variant="filled" sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CheckerMain;
