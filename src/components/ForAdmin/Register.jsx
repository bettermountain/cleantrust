// src/components/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Paper, Box, Typography } from "@mui/material";
import { registerUser } from "../../api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await registerUser(username, password);
      setMessage("登録が完了しました！ログインしてください。");
      setTimeout(() => navigate("/cleantrust/login"), 1500);
    } catch {
      setMessage("登録に失敗しました");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ padding: 4, width: 300 }}>
        <Typography variant="h5" align="center">新規登録</Typography>
        <TextField
          label="ユーザー名"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="パスワード"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {message && <Typography sx={{ mt: 1 }}>{message}</Typography>}
        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleRegister}>
          登録
        </Button>
        <Button fullWidth sx={{ mt: 1 }} onClick={() => navigate("/cleantrust/login")}>
          ログインに戻る
        </Button>
      </Paper>
    </Box>
  );
};

export default Register;
