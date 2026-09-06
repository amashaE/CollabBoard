# CollabBoard

## Collaborative Task Management System

CollabBoard is a web-based collaborative task management system designed to help teams organize, manage, track, and monitor their tasks in one centralized platform.

The system provides a Kanban-style task board, task creation and editing, search and filtering, team member management, calendar deadlines, notifications, user profiles, and persistent task storage using a MySQL database.

---

## Features

### 1. Dashboard Overview

* Centralized project dashboard
* Overview of current tasks
* Quick access to important project information
* Task creation access

### 2. Kanban Task Board

* Tasks organized into three statuses:

  * To Do
  * In Progress
  * Done
* Tasks can be moved between statuses
* Task cards display important task information
* Supports task editing and deletion

### 3. Search and Filter System

* Search tasks by:

  * Title
  * Description
  * Category
  * Assignee
* Filter tasks by priority:

  * Low
  * Medium
  * High
* Filter tasks by status:

  * To Do
  * In Progress
  * Done
* Search and filters can be used together

### 4. Create Task

Users can create new tasks with information such as:

* Task title
* Description
* Category
* Priority
* Status
* Assignee
* Due date

Created tasks are stored in the MySQL database through the backend API.

### 5. Task Details and Editing

* View detailed task information
* Edit task details
* Update task status
* Update task priority
* Update assignee
* Update task information

### 6. Task Deletion

Tasks can be deleted from the task board through the backend API.

### 7. Calendar / Deadlines

* Monthly calendar view
* Previous and next month navigation
* Display of tasks and deadlines
* Priority indicators
* Upcoming deadlines
* Responsive calendar layout

### 8. Team Members

* Team members panel
* Displays members involved in the project
* Provides a centralized view of team information

### 9. Notifications and Activity

* Notifications panel
* Activity information
* Provides users with updates related to project activities

### 10. User Profile

* User profile page
* Displays user-related information

### 11. Authentication

* Login page
* Registration page
* User-oriented application structure

---

## Technologies Used

### Frontend

* React
* JavaScript
* HTML
* CSS
* Vite
* React Router

### Backend

* Node.js
* Express.js

### Database

* MySQL
* MySQL2

### Development Tools

* Visual Studio Code
* Git
* GitHub
* npm

---

## Project Structure

```text
CollabBoard/
│
├── src/
│   ├── components/
│   │   ├── Calendar.jsx
│   │   ├── Calendar.css
│   │   ├── KanbanBoard.jsx
│   │   ├── CreateTaskModal.jsx
│   │   ├── CreateTaskModal.css
│   │   ├── TaskDetailsModal.jsx
│   │   ├── TaskDetailsModal.css
│   │   ├── SearchFilterBar.jsx
│   │   ├── SearchFilterBar.css
│   │   ├── TeamMembersPanel.jsx
│   │   ├── NotificationPanel.jsx
│   │   ├── NotificationItem.jsx
│   │   ├── ActivityFeed.jsx
│   │   ├── UserProfile.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   └── ...
│   │
│   └── App.jsx
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── taskController.js
│   │
│   ├── routes/
│   │   └── taskRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## Database Setup

CollabBoard uses MySQL for persistent task storage.

### 1. Create the database

Open MySQL or MySQL Workbench and create the database:

```sql
CREATE DATABASE syncboard;
```

Select the database:

```sql
USE syncboard;
```

### 2. Create the tasks table

```sql
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) DEFAULT 'General',
    priority VARCHAR(50) DEFAULT 'Medium',
    status VARCHAR(50) DEFAULT 'To Do',
    assignee VARCHAR(255) DEFAULT 'Unassigned',
    due_date DATE NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);
```

---

## Backend Configuration

The backend connects to MySQL through the database configuration in:

```text
server/config/db.js
```

Database configuration can be provided through environment variables.

Example:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=syncboard
```

The `.env` file should not be committed to GitHub.

---

## API Endpoints

The task API is available at:

```text
http://localhost:5000/api/tasks
```

### Get all tasks

```http
GET /api/tasks
```

Returns all tasks stored in the database.

### Create a task

```http
POST /api/tasks
```

Example request body:

```json
{
  "title": "Complete project documentation",
  "description": "Prepare the final project documentation",
  "category": "Documentation",
  "priority": "High",
  "status": "To Do",
  "assignee": "Team Member",
  "dueDate": "2026-09-10"
}
```

### Update a task

```http
PUT /api/tasks/:id
```

Updates an existing task.

### Delete a task

```http
DELETE /api/tasks/:id
```

Deletes a task from the database.

---

## Installation

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* MySQL
* Git

---

## Running the Frontend

Open a terminal in the project root:

```powershell
npm install
```

Start the development server:

```powershell
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

---

## Running the Backend

Open another terminal and navigate to the server folder:

```powershell
cd server
```

Install backend dependencies:

```powershell
npm install
```

Start the backend:

```powershell
node server.js
```

The backend will run at:

```text
http://localhost:5000
```

---

## Running the Complete Application

Two terminals should be used.

### Terminal 1 - Frontend

```powershell
npm run dev
```

### Terminal 2 - Backend

```powershell
cd server
node server.js
```

Make sure MySQL is also running before using the task management features.

---

## Task Management Flow

The application follows this general flow:

```text
User
  │
  ▼
React Frontend
  │
  ▼
Task Management Interface
  │
  ├── Create Task
  ├── View Task
  ├── Edit Task
  ├── Delete Task
  ├── Search Task
  └── Filter Task
  │
  ▼
Express.js Backend
  │
  ▼
Task API
  │
  ▼
MySQL Database
```

---

## Git and GitHub

The project is managed using Git for version control.

The main development branches include:

```text
main
feature/create-task-modal
feature/task-api-persistence
```

The `feature/task-api-persistence` branch contains the task API and database persistence implementation.

Typical Git workflow:

```powershell
git status
git add .
git commit -m "Update CollabBoard features"
git push origin feature/task-api-persistence
```

---

## Responsive Design

The application is designed to provide a usable interface across different screen sizes, including:

* Desktop computers
* Laptops
* Tablets
* Smaller screens

---

## Project Purpose

CollabBoard was developed to provide teams with a centralized platform for managing collaborative work.

The system reduces the need for separate task lists and communication tools by providing task management, progress tracking, search and filtering, deadlines, team information, and notifications within a single application.

---

## Future Improvements

Possible future enhancements include:

* Real-time task updates
* Real-time notifications
* Drag-and-drop Kanban functionality
* Advanced user authentication
* Role-based access control
* Task comments
* File attachments
* Project analytics and reports
* Email notifications
* Improved mobile support

---

## Conclusion

CollabBoard provides a centralized and user-friendly solution for collaborative task management.

By combining a React frontend, Express.js backend, and MySQL database, the system allows users to create, manage, search, filter, update, and delete tasks while maintaining persistent project data.
