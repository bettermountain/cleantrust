import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import "./styles/ChecklistItem.css"; // CSSを適用

const ChecklistItem = ({ item, index, photo, onPhotoUpload }) => (
  <Card className="checklist-card">
    <CardContent className="checklist-card-content">
      {/* チェックリストのテキスト */}
      <Box className="checklist-text-area">
        <Typography className="checklist-text">{item}</Typography>
      </Box>

      {/* 写真アップロードボタン */}
      <Box className="checklist-actions">
        <input
          accept="image/*"
          id={`upload-photo-${index}`}
          type="file"
          onChange={onPhotoUpload}
          style={{ display: "none" }}
        />
        <label htmlFor={`upload-photo-${index}`}>
          <Button variant="contained" className="upload-button" component="span">
            <AddAPhotoIcon />
          </Button>
        </label>
      </Box>
    </CardContent>

    {/* アップロードした画像を表示 */}
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

export default ChecklistItem;
