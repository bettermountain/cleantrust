import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const TaskForm = ({ onAdd }) => {
  const [task, setTask] = useState("");

  return (
    <Box display="flex" gap={2} marginTop={2}>
      <TextField
        label="タスクを入力 (30字まで)"
        variant="outlined"
        fullWidth
        value={task}
        onChange={(e) => setTask(e.target.value)}
        inputProps={{ maxLength: 30 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => { onAdd(task); setTask(""); }}
      >
        追加
      </Button>
    </Box>
  );
};

export default TaskForm;
