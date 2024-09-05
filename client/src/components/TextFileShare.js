import React, { useState } from 'react';
import axios from 'axios';

function TextFileShare() {
  const [text, setText] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [otp, setOtp] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/files/text', { text });
      setGeneratedUrl(response.data.url);
      setOtp(response.data.otp);
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const shortUrlId = generatedUrl.split('/').pop();
    const enteredOtp = prompt('Enter OTP:');
    try {
      const response = await axios.post('http://localhost:5000/verify-otp', {
        shortUrlId,
        otp: enteredOtp
      });
      window.open(response.data.originalUrl, '_blank');
    } catch (err) {
      alert('Invalid OTP!');
      console.error('Error:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div>
      <h2>Share Text File</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button type="submit">Send File</button>
      </form>
      {generatedUrl && (
        <div>
          <p>Generated URL: <a href={generatedUrl} target="_blank" rel="noopener noreferrer">{generatedUrl}</a></p>
          <p>OTP: {otp}</p>
          <button onClick={handleOtpSubmit}>Access File</button>
        </div>
      )}
    </div>
  );
}

export default TextFileShare;
