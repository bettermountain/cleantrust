// src/App.jsx
import React, { useState, useEffect } from "react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import CheckerMain from "./components/Checker/CheckerMain";
import FrameAdmin from "./components/ForAdmin/pages/FrameAdmin";
import CreateListPage from "./components/ForAdmin/pages/CreateListPage";
import ReportList from "./components/ForAdmin/pages/ReportList";
import StaffList from "./components/ForAdmin/pages/StaffList";
import ReportDetail from "./components/ForAdmin/Report/ReportDetail";

import Login from "./components/ForAdmin/Login";
import Register from "./components/ForAdmin/Register";
import Profile from "./components/ForAdmin/Profile";
import { getMe } from "./api";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // トークン変更時にユーザー情報を取得
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setUser(null);
        setLoadingUser(false);
        return;
      }

      try {
        const res = await getMe(); // トークンは api.js の interceptors で付与済み
        setUser(res.data);
      } catch (err) {
        console.error("ユーザー取得失敗:", err);
        setToken(null);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  if (loadingUser) return <div>認証チェック中...</div>;

  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/cleantrust/checker/:user_id" element={<CheckerMain />} />

        {/* ログイン・登録 */}
        <Route path="/cleantrust/login" element={<Login setToken={setToken} setUser={setUser} />} />
        <Route path="/cleantrust/register" element={<Register />} />

        {/* プロフィール画面（おまけ）
        <Route
          path="/cleantrust/profile"
          element={token ? <Profile token={token} setToken={setToken} /> : <Navigate to="/cleantrust/login" />}
        /> */}

        {/* 認証保護された管理画面 */}
        <Route
          path="/cleantrust/admin/"
          element={
            user ? (
              <FrameAdmin user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/cleantrust/login" replace />
            )
          }
        >
          <Route index element={<ReportList />} />
          <Route path="tasklist" element={<CreateListPage />} />
          <Route path="reportlist" element={<ReportList />} />
          <Route path="stafflist" element={<StaffList />} />
          <Route path="reportlist/:reportId" element={<ReportDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
