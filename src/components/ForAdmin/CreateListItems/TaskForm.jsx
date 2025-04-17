import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import SelectBox from "./SelectBox"; // 再利用

const TaskForm = ({ onAdd }) => {
  const [inputText, setInputText] = useState("");
  const [limitTime, setLimitTime] = useState(1); // 数値として管理

  const limitTimeOptions = [0.5, 1, 2, 3, 4, 5].map((min) => `${min}分`);

  const handleSubmit = () => {
    const text = inputText.trim();
    if (!text) return;

    const newTask = {
      id: uuidv4(),
      text,
      number: 0,            // ← 固定
      limit_time: limitTime // ← 数値
    };

    onAdd(newTask);
    setInputText("");
    setLimitTime(5); // 初期に戻す
  };

  return (
<Box display="flex" gap={2} alignItems="center" mt={2}>
  <TextField
    label="チェック項目を追加する (30文字まで)"
    variant="outlined"
    size="small" // ⬅️ 高さ調整のため追加
    fullWidth
    value={inputText}
    onChange={(e) => setInputText(e.target.value)}
    inputProps={{ maxLength: 30 }}
  />
  <Box sx={{ minWidth: 120 }}>
    <SelectBox
      label="制限時間"
      value={`${limitTime}分`}
      options={limitTimeOptions}
      onChange={(val) => setLimitTime(parseInt(val.replace("分", "")))}
    />
  </Box>
  <Button
    variant="contained"
    color="primary"
    onClick={handleSubmit}
    disabled={!inputText.trim()}
    sx={{ height: 40 }} // ⬅️ SelectBoxやTextFieldと揃える
  >
    追加
  </Button>
</Box>

  );
};

export default TaskForm;
