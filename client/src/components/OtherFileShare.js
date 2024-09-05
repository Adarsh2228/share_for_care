import React, { useState } from 'react';
import axios from 'axios';

const OtherFileShare = () => {
  const [fileUrl, setFileUrl] = useState(''); // State to store the uploaded file URL

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(); // Create a FormData object to hold the file
    const fileInput = document.querySelector('input[type="file"]'); // Select the file input
    formData.append('file', fileInput.files[0]); // Append the selected file to FormData

    try {
      // Make the POST request to upload the file
      const response = await axios.post('http://192.168.1.105:5000/api/files/other', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set the content type for file upload
        }
      });

      console.log('File uploaded successfully:', response.data); // Log the success message
      setFileUrl(response.data.fileUrl); // Set the file URL to display
    } catch (error) {
      console.error('Error uploading file:', error.response ? error.response.data : error.message); // Log any errors
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" required /> {/* Input for file selection, required */}
        <button type="submit">Upload File</button> {/* Submit button */}
      </form>
      {fileUrl && ( // If fileUrl is set, display the link to the uploaded file
        <div>
          <p>File uploaded successfully! Access it <a href={fileUrl} target="_blank" rel="noopener noreferrer">here</a>.</p>
        </div>
      )}
    </div>
  );
};

export default OtherFileShare;
