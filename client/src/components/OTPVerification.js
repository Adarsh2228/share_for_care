import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function OTPVerification() {
  const { type } = useParams();
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      await axios.post(`http://localhost:5000/api/verify-otp/${type}`, { otp });
      navigate('/dashboard');
    } catch (err) {
      alert('OTP verification failed');
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
      />
      <button onClick={handleVerify}>Verify OTP</button>
    </div>
  );
}

export default OTPVerification;
