import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Box,
  List,
  CircularProgress,
} from "@mui/material";

// 📝 並び替え機能は今後再利用するため、コメントアウトで残しています。
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import SelectBox from "./SelectBox";
import Notification from "../../cmn/Notification"; // ✅ 通知追加
import "../style/TaskList.css";
import {
  fetchTasks,
  addTask,
  // updateTasksOrder, // ← 並び順変更機能は今後使うので消さないこと
  deleteTask,
  updateTask,
} from "../../../api";

// 並び替え関数（今後使用する可能性があるためコメントアウトで残しています）
// function reorder(list, startIndex, endIndex) {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);
//   return result;
// }

const TaskList = ({ placeId, placeName }) => {
  const [tasks, setTasks] = useState([]);
  const [question, setQuestion] = useState(5);
  const [loading, setLoading] = useState(false);

  const [editingIndex, setEditingIndex] = useState(null);

  // ✅ 通知メッセージ
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const reportItemCounts = Array.from({ length: 10 }, (_, i) => `${i + 1}問`);

  const loadTasks = async () => {
    if (!placeId) return;
    setLoading(true);
    try {
      const res = await fetchTasks(placeId);
      setTasks(res.data);
    } catch (err) {
      console.error("タスク取得失敗", err);
      setErrorMsg("タスクの取得に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [placeId]);

  const handleAddTask = async (newTask) => {
    setLoading(true);
    try {
      await addTask(placeId, newTask.text, 0, newTask.limit_time); // ← number=0
      await loadTasks();
      setSuccessMsg("タスクを追加しました。");
    } catch (err) {
      console.error("タスク追加失敗", err);
      setErrorMsg("タスクの追加に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  const handleEditTask = async (index, text, limit_time) => {
    setLoading(true);
    try {
      const updated = [...tasks];
      const task = updated[index];
      task.itemtext = text;
      task.limit_time = limit_time;
      setTasks(updated);
      await updateTask(task.id, text, limit_time); // ← 必要に応じてAPI呼び出し
      setSuccessMsg("タスクを更新しました。");
    } catch (err) {
      console.error("タスク更新失敗", err);
      setErrorMsg("タスクの更新に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (index) => {
    const confirmed = window.confirm("この項目を削除しますか？");
    if (!confirmed) return;
    setLoading(true);
    try {
      const target = tasks[index];
      await deleteTask(target.id);
      const updated = tasks.filter((_, i) => i !== index);
      setTasks(updated);
      setSuccessMsg("タスクを削除しました。");
    } catch (err) {
      console.error("タスク削除失敗", err);
      setErrorMsg("タスクの削除に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-list-container">
      <Paper className="task-list-paper" elevation={3}>
        <Box className="task-list-header">
          <Box className="task-list-title-row">
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {placeName} のチェックリスト
            </Typography>
            <Typography variant="body2" color="text.secondary">
              登録数：{tasks.length}
            </Typography>
          </Box>

          <Box display="flex" gap={2}>
            <SelectBox
              label="報告項目数"
              options={reportItemCounts}
              value={`${question}問`}
              onChange={(val) => setQuestion(parseInt(val.replace("問", "")))}
            />
          </Box>

          <TaskForm onAdd={handleAddTask} />
        </Box>

        <Paper className="task-list-scroll-container" variant="outlined">
          {/* ヘッダー固定行 */}
          <Box
            className="task-list-table-header"
            display="flex"
            sx={{
              fontWeight: 'bold',
              backgroundColor: '#f5f5f5',
              px: 2,
              py: 1,
              borderBottom: '1px solid #ccc',
              position: 'sticky',
              top: 0,
              zIndex: 1
            }}
          >
            <Box sx={{ width: '50%' }}>チェック項目</Box>
            <Box sx={{ width: '25%' }}>制限時間</Box>
            <Box sx={{ width: '25%' ,textAlign: 'right' }}>操作</Box>
          </Box>

          {/* リスト部分（スクロール対象） */}
          <Box className="task-list-scroll-content">
            {loading ? (
              <Box display="flex" justifyContent="center" py={4}>
                <CircularProgress />
              </Box>
            ) : (
              <List sx={{ minHeight: 80 }}>
                {tasks.map((task, index) => (
                  <div key={task.id} style={{ marginBottom: 8 }}>
                    <TaskItem
                      task={task}
                      index={index}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                      editingIndex={editingIndex}
                      setEditingIndex={setEditingIndex}
                    />
                  </div>
                ))}
              </List>
            )}
          </Box>
        </Paper>

        {/* 通知 */}
        <Notification open={!!successMsg} message={successMsg} type="success" onClose={() => setSuccessMsg("")} />
        <Notification open={!!errorMsg} message={errorMsg} type="error" onClose={() => setErrorMsg("")} />
      </Paper>
    </div>
  );
};

export default TaskList;
