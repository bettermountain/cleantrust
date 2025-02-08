import { useState } from "react";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import SelectBox from "./SelectBox";
import { Paper, Typography, Box, List } from "@mui/material";

const TaskList = ({ property }) => {
    const [tasks, setTasks] = useState([]);
    const [question, setQuestion] = useState(1);
    const [minutes, setMinutes] = useState(5);

    return (
        <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
            <Typography variant="h6">{property} のタスク</Typography>
            <Box display="flex" gap={2} marginY={2}>
                <SelectBox label="問数" options={[1, 2, 3, 4, 5]} value={question} onChange={setQuestion} />
                <SelectBox label="時間(分)" options={[5, 10, 15, 20, 30]} value={minutes} onChange={setMinutes} />
            </Box>

            <TaskForm onAdd={(task) => setTasks([task, ...tasks])} />

            {/* Jiraのバックログ風に上から追加 */}
            <List>
                {tasks.map((task, index) => (
                    <TaskItem
                        key={index}
                        task={task}
                        index={index}
                        onEdit={(i, newTask) => {
                            const updatedTasks = [...tasks];
                            updatedTasks[i] = newTask;
                            setTasks(updatedTasks);
                        }}
                        onDelete={(i) => setTasks(tasks.filter((_, idx) => idx !== i))}
                    />
                ))}
            </List>
        </Paper>
    );
};

export default TaskList;
