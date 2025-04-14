import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import "./styles/ChecklistItem.css"; // 🔹 CSSスタイル適用

/**
 * チェックリスト項目カード
 * @param {Object} props
 * @param {string} props.item - チェック項目のテキスト
 * @param {number} props.index - チェックリストのインデックス
 * @param {string} props.photo - アップロード済み写真のURL
 * @param {Function} props.onPhotoUpload - 写真アップロード処理（親コンポーネントで実装）
 */
const ChecklistItem = ({ item, index, photo, onPhotoUpload }) => {
  // 🔸 アップロード状態（ローディング表示制御）
  const [uploading, setUploading] = useState(false);

  // 🔸 エラー状態（失敗時のアイコン表示）
  const [error, setError] = useState(false);

  // 🔹 ファイル選択時の処理
  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError(false);

    try {
      // 🔸 親から渡されたアップロード関数を呼び出す
      await onPhotoUpload(index, e);
    } catch (err) {
      console.error("アップロードエラー:", err);
      setError(true); // エラー発生時に赤アイコン表示
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="checklist-card">
      <CardContent className="checklist-card-content">
        {/* 🔹 チェックリストのテキスト表示 */}
        <Box className="checklist-text-area">
          <Typography className="checklist-text">{item}</Typography>
        </Box>

        {/* 🔹 写真アップロードボタン */}
        <Box className="checklist-actions">
          <input
            accept="image/*"
            id={`upload-photo-${index}`}
            type="file"
            onChange={handleChange}
            style={{ display: "none" }}
          />
          <label htmlFor={`upload-photo-${index}`}>
            <Tooltip
              title={
                error
                  ? "アップロード失敗しました。再試行してください"
                  : photo
                  ? "アップロード済み"
                  : "写真をアップロード"
              }
            >
              <span>
                <Button
                  variant="contained"
                  component="span"
                  className="upload-button"
                  disabled={uploading}
                >
                  {uploading ? (
                    // 🔸 アップロード中はスピナー表示
                    <CircularProgress size={24} color="inherit" />
                  ) : error ? (
                    // 🔸 エラー時：赤いアイコン
                    <ErrorOutlineIcon color="error" />
                  ) : photo ? (
                    // 🔸 成功時：緑のチェック
                    <CheckCircleIcon color="success" />
                  ) : (
                    // 🔸 初期状態：カメラアイコン
                    <AddAPhotoIcon />
                  )}
                </Button>
              </span>
            </Tooltip>
          </label>
        </Box>
      </CardContent>

      {/* 🔹 アップロードされた画像のプレビュー表示 */}
      {photo && (
        <img
          className="uploaded-image"
          src={photo}
          alt={`清掃項目 ${index + 1}`}
          style={{ maxWidth: 200, marginTop: 10 }}
        />
      )}
    </Card>
  );
};

export default ChecklistItem;
