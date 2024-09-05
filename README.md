# File Sharing with OTP Authentication

This project allows users to upload files (such as text, images, or documents) and generate a shareable URL that is accessible from any device. The shared URL requires OTP (One-Time Password) verification before users can access the file. 

## Features
- Upload text or file and generate a short URL for sharing.
- OTP verification for secure file access.
- Supports various file types including text, images, and documents.
- Accessible from any device (mobile, desktop, etc.).
  
## Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Storage**: Multer for file upload handling
- **Security**: OTP verification

## Installation

### Prerequisites
- Node.js installed on your machine
- MongoDB installed or MongoDB Atlas set up

### Steps to Install and Run

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/filesharing-otp.git
    cd filesharing-otp
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up the `.env` file:
    Create a `.env` file in the root of the project and add the following environment variables:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/yourdbname
    ```

    - `PORT`: The port number where the server will run (default is `5000`).
    - `MONGO_URI`: Your MongoDB connection string.

4. Start the server:
    ```bash
    npm start
    ```

    This will start the backend server on `http://localhost:5000`.

5. Navigate to the `client` folder and install frontend dependencies:
    ```bash
    cd client
    npm install
    ```

6. Start the React frontend:
    ```bash
    npm start
    ```

    The React app will run on `http://localhost:3000`.

## Usage

1. **File Upload**: Go to the homepage and select a file to upload. After uploading, you will receive a short URL that you can share with others.

2. **OTP Verification**: When a user accesses the short URL, they will be prompted to enter the OTP. Only upon entering the correct OTP will they be redirected to the file.

## File Structure

- **server/**: Contains all backend-related code, including API routes, OTP handling, and file storage.
- **client/**: Contains all frontend-related code, built with React.js.

## Routes

- **POST /api/files/other**: Uploads a file and generates a short URL with OTP.
- **POST /api/files/text**: Uploads a text file and generates a short URL with OTP.
- **GET /:shortUrlId**: Serves an OTP input form for the provided short URL.
- **POST /verify-otp**: Verifies the OTP and redirects to the original file.

## Example .env File

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/dbname?retryWrites=true&w=majority
