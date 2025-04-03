# Fullstack Authentication App

A complete authentication system with Firebase, React (Next.js), and Node.js/Express backend.

## Features

- Google authentication with Firebase
- Role-based access control (user/admin)
- JWT token management
- Protected routes
- Todo management system
- Email notifications

## Tech Stack

**Frontend:**

- Next.js 15
- React 19
- Tailwind CSS
- Firebase Authentication
- Axios (for API calls)

**Backend:**

- Node.js
- Express.js
- Firebase Admin SDK
- MongoDB (with Mongoose)
- Nodemailer (for emails)

## Installation

### Prerequisites

- Node.js v18+
- MongoDB Atlas account or local MongoDB
- Firebase project
- Gmail account (for email functionality)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fullstack-auth-app.git
   cd fullstack-auth-app/backend
   ```

2.Install dependencies\*\*

```bash
npm install
```

3. **Environment Configuration**

   Create a `.env` file in the backend directory:

   ```env
   # Firebase
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CLIENT_EMAIL=your-client-email
   FIREBASE_PRIVATE_KEY="your-private-key"

   # Database
   MONGODB_URI=mongodb+srv://your-mongodb-uri

   # Email (Gmail)
   GMAIL_USER=your-email@gmail.com
   GMAIL_PASS=your-app-password

   # App
   PORT=5000
   JWT_SECRET=your-jwt-secret
   ```

4. **Run the backend**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd ../frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   Create a `.env.local` file in the frontend directory:

4. **Run the frontend**
   ```bash
   npm run dev
   ```

## Firebase Configuration

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Google authentication in Firebase Console
3. Download your Firebase Admin SDK credentials and add to backend `.env`
4. Configure Firebase web app and add credentials to frontend `.env.local`

## Database Configuration

1. Create a MongoDB Atlas account at https://cloud.mongodb.com/
2. Create a database and add connection string to backend `.env`
3. Add database connection string to frontend `.env.local`

## API Endpoints

| Endpoint           | Method | Description                    |
| ------------------ | ------ | ------------------------------ |
| `/api/auth/login`  | POST   | User login with Firebase token |
| `/api/auth/verify` | GET    | Verify user token and get role |
| `/api/todo/create` | POST   | Create new todo (admin only)   |
| `/api/todo/list`   | GET    | Get all todos                  |

## Deployment

### Backend Deployment (Heroku)

1. Create a Render account.
2. Login and deploy:

### Frontend Deployment (Vercel)

1. Create a Vercel account.
2. Login and deploy.

## Troubleshooting

**Firebase Errors:**

- Verify your Firebase credentials in both frontend and backend
- Check Firebase project authentication methods are enabled

**Database Connection:**

- Ensure MongoDB URI is correct
- Check network access in MongoDB Atlas if using cloud database

**Email Issues:**

- Enable "Less Secure Apps" in Gmail account
- Generate an App Password if 2FA is enabled

## License

MIT

## Contributor

- Mohd Arsalan - thesiddiqui7@gmail.com

## Acknowledgments

- Firebase documentation
- Next.js documentation
- Express.js documentation

```

This README includes:

1. Comprehensive setup instructions for both backend and frontend
2. Environment configuration details
3. Firebase setup guidance
4. Project structure overview
5. API documentation
6. Deployment instructions for Heroku and Vercel
7. Troubleshooting common issues
8. License and contributor information

You can customize this further by:
- Adding screenshots of your application
- Including specific code examples for complex features
- Adding development guidelines for contributors
- Expanding the troubleshooting section with common errors and solutions

Note: This README is a template and should be modified to fit your project's specific requirements.
```
