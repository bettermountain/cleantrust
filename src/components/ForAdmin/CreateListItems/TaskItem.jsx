// src/components/CreateListItems/TaskItem.jsx
import { useState, useEffect, forwardRef } from "react";
import {
  TextField,
  IconButton,
  ListItem,
  Grid,
  Typography,
  Box,
  MenuItem,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const TaskItem = forwardRef(
  ({ task, index, onEdit, onDelete, editingIndex, setEditingIndex }, ref) => {
    const isEditing = editingIndex === index;
    const limitTimeOptions = [1, 3, 5, 7, 10];

    const [draftText, setDraftText] = useState(task.itemtext);
    const [draftLimitTime, setDraftLimitTime] = useState(task.limit_time);
    const [showConfirm, setShowConfirm] = useState(false);

    // 編集中に内容が変わったら保存
    const handleConfirm = () => {
      onEdit(index, draftText, draftLimitTime);
      setEditingIndex(null);
    };

    // 他の行の編集を中断する確認モーダル
    const handleEditStart = () => {
      if (editingIndex !== null && editingIndex !== index) {
        setShowConfirm(true);
      } else {
        setEditingIndex(index);
      }
    };

    const handleDiscardAndSwitch = () => {
      setShowConfirm(false);
      setEditingIndex(index);
    };

    const handleCancel = () => {
      setDraftText(task.itemtext);
      setDraftLimitTime(task.limit_time);
      setEditingIndex(null);
    };

    return (
      <>
        <ListItem
          ref={ref}
          sx={{
            minHeight: 60,
            borderBottom: "1px solid #ddd",
            px: 2,
          }}
        >
          <Grid container alignItems="center" spacing={2}>
            {/* チェック項目 */}
            <Grid item xs={6}>
              {isEditing ? (
                <TextField
                  value={draftText}
                  onChange={(e) => setDraftText(e.target.value)}
                  fullWidth
                  size="small"
                  autoFocus
                />
              ) : (
                <Typography variant="body1">{task.itemtext}</Typography>
              )}
            </Grid>

            {/* 制限時間 */}
            <Grid item xs={3}>
              {isEditing ? (
                <Select
                  value={draftLimitTime}
                  size="small"
                  onChange={(e) => setDraftLimitTime(Number(e.target.value))}
                  fullWidth
                >
                  {limitTimeOptions.map((min) => (
                    <MenuItem key={min} value={min}>
                      {min} 分
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {task.limit_time} 分
                </Typography>
              )}
            </Grid>

            {/* 操作ボタン */}
            <Grid item xs={3}>
              <Box display="flex" justifyContent="flex-end">
                {isEditing ? (
                  <>
                    <IconButton onClick={handleConfirm}>
                      <CheckIcon color="success" />
                    </IconButton>
                    <IconButton onClick={handleCancel}>
                      <CloseIcon color="warning" />
                    </IconButton>
                    <IconButton disabled>
                      <DeleteIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton onClick={handleEditStart}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onDelete(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </ListItem>

        {/* 編集切り替え確認ダイアログ */}
        <Dialog open={showConfirm} onClose={() => setShowConfirm(false)}>
          <DialogTitle>編集の切り替え確認</DialogTitle>
          <DialogContent>
            <Typography>
              現在編集中の内容は破棄されます。続行しますか？
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowConfirm(false)}>キャンセル</Button>
            <Button onClick={handleDiscardAndSwitch} variant="contained" color="primary">
              切り替える
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
);

export default TaskItem;
