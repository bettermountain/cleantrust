import React, { useState } from "react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CheckerMain from "./components/Checker/CheckerMain";
import AdminHome from "./components/ForAdmin/pages/AdminHome";
import CreateListPage from "./components/ForAdmin/pages/CreateListPage";
import ReportList from "./components/ForAdmin/pages/ReportList";
import Login from "./components/ForAdmin/Login";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/cleantrust" element={<CheckerMain />} />
        <Route path="/cleantrust/login" element={<Login onLogin={setUser} />} />
        <Route
          path="/cleantrust/admin/"
          element={user ? <AdminHome user={user} /> : <Navigate to="/cleantrust/login" />}
        >
          <Route path="" element={<ReportList />} />
          <Route path="task-management" element={<CreateListPage />} />
          <Route path="report-list" element={<ReportList />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
