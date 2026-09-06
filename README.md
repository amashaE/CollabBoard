# SyncBoard

SyncBoard is a full-stack collaborative task management application designed to help teams organize, manage, track, and monitor project tasks through an interactive dashboard and Kanban board.

The application provides a modern React frontend connected to a Node.js and Express REST API backend, with MongoDB Atlas used for persistent data storage through Mongoose.

---

## 📌 Project Overview

SyncBoard allows users to:

- Create and manage tasks
- View tasks through a Kanban board
- Update task status
- Edit task details
- Delete tasks
- Search and filter tasks
- View task priorities and deadlines
- View team members
- Manage notifications
- View activity information
- View calendar information
- Manage user profile information
- Store task data persistently in MongoDB Atlas

---

## 🛠️ Technologies Used

### Frontend

- React
- JavaScript
- HTML
- CSS
- Vite
- React Router

### Backend

- Node.js
- Express.js
- REST API
- CORS
- dotenv

### Database

- MongoDB Atlas
- MongoDB
- Mongoose ODM

### Development Tools

- Visual Studio Code
- Git
- GitHub
- Postman
- MongoDB Atlas

---

## 📂 Project Structure

```text
SyncBoard/
│
├── src/
│   ├── components/
│   │   ├── ActivityFeed.jsx
│   │   ├── Calendar.jsx
│   │   ├── CreateTaskModal.jsx
│   │   ├── KanbanBoard.jsx
│   │   ├── Login.jsx
│   │   ├── NotificationPanel.jsx
│   │   ├── Register.jsx
│   │   ├── SearchFilterBar.jsx
│   │   ├── TaskDetailsModal.jsx
│   │   ├── TeamMembersPanel.jsx
│   │   └── UserProfile.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── server/
│   ├── config/
│   │   └── mongodb.js
│   │
│   ├── controllers/
│   │   └── taskController.js
│   │
│   ├── models/
│   │   └── Task.js
│   │
│   ├── routes/
│   │   └── taskRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── public/
├── package.json
├── README.md
└── .gitignore