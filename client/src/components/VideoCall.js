import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function VideoCall() {
  const [recipientId, setRecipientId] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/video-call', {
        recipientId,
        meetingLink,
        otp,
      });
      navigate('/video-call-room');
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div>
      <h2>Video Call</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipient ID"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Meeting Link"
          value={meetingLink}
          onChange={(e) => setMeetingLink(e.target.value)}
          required
        />
        <button type="submit">Send Call Request</button>
      </form>
    </div>
  );
}

export default VideoCall;
