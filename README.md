# Task Manager Application

A full-stack to-do list application with user authentication where users can manage their tasks.

## Features

- **User Authentication**: Register, login and maintain user sessions
- **Task Management**: Create, read, update, and delete tasks
- **Task Filtering**: Filter tasks by search term, priority and status
- **Responsive Design**: Works on both desktop and mobile devices
- **Data Security**: JWT-based authentication ensures users only access their own tasks

## Tech Stack

### Frontend
- React for the UI
- Material-UI for design components
- React Context API for state management
- React Router for navigation
- Axios for API requests

### Backend
- Node.js with Express.js for the server
- MongoDB with Mongoose for data storage
- JWT for authentication
- bcrypt.js for password hashing

## Project Structure

```
todo-app/
├── client/               # React frontend
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── context/      # Context API for state management
│       ├── pages/        # Page components
│       └── utils/        # Utility functions
└── server/               # Node.js backend
    ├── config/           # Configuration files
    ├── controllers/      # Request handlers
    ├── middleware/       # Custom middleware
    ├── models/           # Database models
    └── routes/           # API routes
```

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Backend Setup
1. Navigate to the server directory:
   ```
   cd todo-app/server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   ```

4. Start the server:
   ```
   npm run dev
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```
   cd todo-app/client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. The application will be available at http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login existing user
- `GET /api/auth/me` - Get current user profile

### Tasks
- `GET /api/tasks` - Get all tasks for logged in user
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update an existing task
- `DELETE /api/tasks/:id` - Delete a task

## Deployment

### Backend Deployment
1. Create an account on a cloud platform like Heroku
2. Set up the environment variables in the platform's dashboard
3. Deploy the server code

### Frontend Deployment
1. Build the React app:
   ```
   cd client
   npm run build
   ```
2. Deploy the build folder to a service like Netlify or Vercel