import React from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import CheckerMain from './components/Checker/CheckerMain';

function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<CheckerMain />} />
        <Route path="/completion" element={<div>清掃完了画面</div>} />
      </Routes>
    </>
  );
}

export default App;