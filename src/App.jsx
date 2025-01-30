import React from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import CheckerMain from './components/Checker/CheckerMain';

function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/cleantrust" element={<CheckerMain />} />
      </Routes>
    </>
  );
}

export default App;