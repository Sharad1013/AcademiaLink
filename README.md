# AcademiaLink📕📖📗📚

AcademiaLink is a platform designed for teachers to create and manage classrooms focused on Data Structures and Algorithms (DSA). Teachers can upload notes (text, PDFs, and images), and students can join classrooms after OTP verification to access the resources and collaborate.

## Features

### Authentication
- **User Registration & Login**: Both teachers and students can register and log in to their accounts.

### Teacher Features
- **Create Classrooms**: Teachers can create classrooms for different topics.
- **Upload Notes**: Teachers can upload text-based notes, PDFs, and images for each classroom.
- **Manage Students**: Teachers can approve student access using OTP verification sent via email.
- **Search Classrooms**: Teachers can search and manage classrooms they’ve created and add notes.

### Student Features
- **Search for Classrooms**: Students can search through the available classrooms.
- **Join Classrooms**: Students must request an OTP from the teacher via email using Nodemailer before joining.
- **Access Notes**: Once joined, students can view all uploaded notes (text, PDF, images).

## Tech Stack

- **Frontend**: React, react-router-dom, Toastify
- **Backend**: Node.js, Express.js, Nodemailer
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT-based registration, login, and session management
- **Other**: PDF/Image uploads, Cloudinary, multer

## Installation

### Clone the repository

```bash
git clone https://github.com/Sharad1013/AcademiaLink.git
cd AcademiaLink
```
1. Frontend
  Navigate to the frontend directory:
  ```bash
  cd AcademiaLink
  ```

2. Install dependencies:
  ```bash
  npm install
  ```

3. Start the development server:
   ```bash
   npm run dev
   ```

Backend

1. Navigate to the backend directory:
  ```bash
  cd AcademiaLinkServer
  ```

2. Install dependencies:
   ```bash
    npm install
   ```

3.Set up your `.env` file with the necessary configurations:

  - `PORT` - The port your backend server will run on (e.g., `5000`).
  - `MONGODB_URI` - The connection URI for your MongoDB database.
  - `DB_NAME` - The name of your database (e.g., `AcademiaLink`).
  - `FRONTEND_URL` - The URL of your frontend application (e.g., `http://localhost:5173`).
  - `JWT_SECRET_KEY` - Secret key for signing JWT tokens.
  - `JWT_REFRESH_SECRET_KEY` - Secret key for signing refresh JWT tokens.
  - `COMPANY_EMAIL` - Email address for your platform (e.g., `abcde1234@gmail.com`).
  - `ACADEMIALINK_PASSWORD` - Password for the AcademiaLink account (used for secure operations).
  - `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name for file uploads.
  - `CLOUDINARY_API_KEY` - Cloudinary API key for authentication.
  - `CLOUDINARY_API_SECRET` - Cloudinary API secret for authentication.

4. Start the Server
   ```bash
    npm run dev
   ```

Usage
For Teachers:

  Register and log in as a teacher.
  Create classrooms and upload notes (text, PDFs, images).
  Manage student access through OTP verification.

For Students:

  Register and log in as a student.
  Search for available classrooms.
  Request OTP from the teacher and join the classroom.
  Access all notes once joined.
