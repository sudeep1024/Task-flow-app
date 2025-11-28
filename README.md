# TaskFlow - Task Management Application

A modern, full-stack task management application built with the MERN stack, featuring a premium glassmorphism UI design with dark/light theme support.

## ✨ Features

### Core Functionality
- 🔐 **User Authentication** - Secure JWT-based authentication
- ✅ **Task Management** - Create, read, update, and delete tasks
- 🏷️ **Priority Levels** - Organize tasks by Low, Medium, or High priority
- 📅 **Due Dates** - Set deadlines for your tasks
- 🔍 **Search & Filter** - Find tasks quickly with real-time search and smart filters
- ✓ **Task Completion** - Toggle tasks between completed and pending states

### Design & UX
- 🎨 **Premium Glassmorphism UI** - Modern, translucent design with blur effects
- 🌓 **Dark/Light Themes** - Switch between themes with smooth transitions
- 📊 **Stats Dashboard** - Visual overview of your tasks with animated cards
- ✨ **Smooth Animations** - Framer Motion powered transitions
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎯 **Custom Checkbox** - Beautiful, clickable checkbox buttons

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Fast build tool
- **TailwindCSS v4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **date-fns** - Date formatting
- **Axios** - HTTP client
- **React Router** - Navigation

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sudeep1024/Task-flow-app.git
   cd Task-flow-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

   Start the backend server:
   ```bash
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

   Start the development server:
   ```bash
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 📁 Project Structure

```
taskflow/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── middleware/
│   │   └── auth.js
│   ├── config/
│   │   └── db.js
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── TaskItem.jsx
    │   │   ├── TaskList.jsx
    │   │   ├── AddTaskModal.jsx
    │   │   └── PrivateRoute.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── ThemeContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── Settings.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    └── package.json
```

## 🎨 Features Showcase

### Dashboard
- Visual stats cards showing total, completed, pending, and high-priority tasks
- Real-time search functionality
- Filter buttons for quick task organization
- Animated task cards with hover effects

### Task Management
- Custom checkbox buttons for marking tasks complete
- Priority badges with gradient colors
- Due date display with calendar icons
- Edit and delete actions with smooth animations

### Settings
- Theme toggle with animated switch
- Account settings section
- Smooth theme transitions

## 🔒 Authentication

The app uses JWT (JSON Web Tokens) for secure authentication:
- Passwords are hashed using bcryptjs
- Tokens are stored in localStorage
- Protected routes require valid authentication

## 🌈 Theme System

- **Light Theme**: Clean white background with subtle gradients
- **Dark Theme**: Dark blue/slate color scheme
- **Theme-Aware Text**: All text colors adapt automatically
- **Persistent**: Theme preference saved in localStorage

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Tasks (Protected)
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Video 

https://github.com/user-attachments/assets/a6b4fb95-2538-4511-8791-769b35362b4e



## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Sudeep**
- GitHub: [@sudeep1024](https://github.com/sudeep1024)

## 🙏 Acknowledgments

- Design inspiration from modern task management apps
- Glassmorphism design trend
- MERN stack community

---

Made with ❤️ using React, Node.js, and MongoDB

