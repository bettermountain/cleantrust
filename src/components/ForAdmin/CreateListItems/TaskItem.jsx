import { useState } from "react";
import { TextField, IconButton, ListItem, ListItemText, ListItemSecondaryAction } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

const TaskItem = ({ task, index, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState(task);

  return (
    <ListItem>
      {isEditing ? (
        <TextField
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          fullWidth
          autoFocus
        />
      ) : (
        <ListItemText primary={task} />
      )}

      <ListItemSecondaryAction>
        {isEditing ? (
          <IconButton edge="end" onClick={() => { onEdit(index, newTask); setIsEditing(false); }}>
            <CheckIcon color="success" />
          </IconButton>
        ) : (
          <IconButton edge="end" onClick={() => setIsEditing(true)}>
            <EditIcon />
          </IconButton>
        )}
        <IconButton edge="end" onClick={() => onDelete(index)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TaskItem;
