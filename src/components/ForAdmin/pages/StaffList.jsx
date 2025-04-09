import { useState, useEffect } from "react";
import {
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  Typography,
  Box,
  IconButton,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import Notification from "../../cmn/Notification";
import { fetchStaffs, addStaff, updateStaff, deleteStaff } from "../../../api";

const StaffList = () => {
  const [staffs, setStaffs] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [loading, setLoading] = useState(true);

  // 通知用
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchStaffs();
      setStaffs(res.data);
    } catch {
      setErrorMsg("スタッフの取得に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async () => {
    if (!name.trim()) return;
    try {
      await addStaff({ name });
      setName("");
      await load();
      setSuccessMsg("スタッフを追加しました。");
    } catch {
      setErrorMsg("スタッフの追加に失敗しました。");
    }
  };

  const handleEdit = (id, currentName) => {
    setEditId(id);
    setEditName(currentName);
  };

  const handleEditConfirm = async (id) => {
    if (!editName.trim()) return;
    try {
      await updateStaff(id, editName);
      setEditId(null);
      setEditName("");
      await load();
      setSuccessMsg("スタッフを更新しました。");
    } catch {
      setErrorMsg("スタッフの更新に失敗しました。");
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditName("");
  };

  const handleDelete = async (id) => {
    try {
      await deleteStaff(id);
      await load();
      setSuccessMsg("スタッフを削除しました。");
    } catch {
      setErrorMsg("スタッフの削除に失敗しました。");
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, margin: "0 auto" }}>
      <Typography variant="h6" gutterBottom>
        スタッフ管理
      </Typography>

      {/* 入力欄 */}
      <Box
        display="flex"
        gap={2}
        alignItems="center"
        mb={3}
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <TextField
          label="スタッフ名"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          size="small"
        />
        <Button
          onClick={handleAdd}
          variant="contained"
          color="primary"
          sx={{ minWidth: 100, whiteSpace: "nowrap", height: 40, px: 4 }}
          disabled={!name.trim()}
        >
          追加
        </Button>
      </Box>

      {/* スタッフ一覧 */}
      <Typography variant="subtitle1" gutterBottom>
        登録済みスタッフ
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : staffs.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          スタッフはまだ登録されていません。
        </Typography>
      ) : (
        <List disablePadding>
          {staffs.map((s) => (
            <Box key={s.id} sx={{ borderRadius: 1, overflow: "hidden", mb: 1 }}>
              <ListItem
                sx={{
                  bgcolor: "#f9f9f9",
                  py: 1.5,
                  px: 2,
                  borderRadius: 1,
                  boxShadow: 1,
                }}
                secondaryAction={
                  <Box>
                    {editId === s.id ? (
                      <>
                        <IconButton onClick={() => handleEditConfirm(s.id)}>
                          <CheckIcon color="success" />
                        </IconButton>
                        <IconButton onClick={handleEditCancel}>
                          <CloseIcon color="error" />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton onClick={() => handleEdit(s.id, s.name)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(s.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </Box>
                }
              >
                {editId === s.id ? (
                  <TextField
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    fullWidth
                    size="small"
                    variant="outlined"
                  />
                ) : (
                  <ListItemText
                    primary={s.name}
                    primaryTypographyProps={{ fontSize: "1rem", fontWeight: 500 }}
                  />
                )}
              </ListItem>
            </Box>
          ))}
        </List>
      )}

      {/* 通知 */}
      <Notification open={!!successMsg} message={successMsg} type="success" onClose={() => setSuccessMsg("")} />
      <Notification open={!!errorMsg} message={errorMsg} type="error" onClose={() => setErrorMsg("")} />
    </Paper>
  );
};

export default StaffList;
