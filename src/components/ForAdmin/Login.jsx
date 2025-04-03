// src/components/ForAdmin/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Paper, Box, Typography } from "@mui/material";
import { loginUser, getMe } from "../../api";

const Login = ({ setToken, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginUser(username, password);
      const token = res.data.access_token;

      setToken(token);
      localStorage.setItem("token", token);

      const profile = await getMe();
      setUser(profile.data);

      navigate("/cleantrust/admin");
    } catch (err) {
      console.error("ログインエラー:", err);
      setError("ログインに失敗しました。ユーザー名またはパスワードをご確認ください。");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ padding: 4, textAlign: "center", width: 400 }}>
        <Typography variant="h5">ログイン</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          label="ユーザー名"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="パスワード"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          ログイン
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
