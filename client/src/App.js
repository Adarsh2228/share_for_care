import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import FileShare from './components/FileShare';
import TextFileShare from './components/TextFileShare';
import OtherFileShare from './components/OtherFileShare';
import VideoCall from './components/VideoCall';
import OTPVerification from './components/OTPVerification';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/share-files" element={<FileShare />} />
      <Route path="/share-text-file" element={<TextFileShare />} />
      <Route path="/share-other-file" element={<OtherFileShare />} />
      <Route path="/video-call" element={<VideoCall />} />
      <Route path="/verify-otp/:type" element={<OTPVerification />} />
    </Routes>
  );
}

export default App;
