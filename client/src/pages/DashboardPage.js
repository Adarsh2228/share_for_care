import React from 'react';
import { Link } from 'react-router-dom';

function DashboardPage() {
  return (
    <div>
      <h1>Dashboard Page</h1>
      <nav>
        <ul>
          <li><Link to="/share-files">Share Files</Link></li>
          <li><Link to="/video-call">Video Call</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default DashboardPage;
