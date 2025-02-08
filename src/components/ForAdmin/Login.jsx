import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Paper, Box, Typography } from "@mui/material";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      onLogin(username);
      navigate("/cleantrust/admin"); // ✅ ログイン後に管理画面へ
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
        <Typography variant="h5">ログイン</Typography>
        <TextField
          label="ユーザー名"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          ログイン
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
