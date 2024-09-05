import React from 'react';
import { Link } from 'react-router-dom';

function FileShare() {
  return (
    <div>
      <h2>Share Files</h2>
      <nav>
        <ul>
          <li><Link to="/share-text-file">Share Text File</Link></li>
          <li><Link to="/share-other-file">Share Other File</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default FileShare;
