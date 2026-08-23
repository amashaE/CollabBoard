import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';

import CreateTaskModal from './components/CreateTaskModal';
<<<<<<< HEAD
<<<<<<< HEAD
import KanbanBoard from './components/KanbanBoard';
import TeamMembersPanel from './components/TeamMembersPanel';
import Notifications from './Pages/Notifications';
import DashboardPage from './Pages/Dashboard';
=======
feature/auth-and-profile
import Dashboard from './Pages/Dashboard';


import Notifications from './pages/Notifications';

>>>>>>> d60129d (Fix duplicate TeamMembersPanel import error)

import './App.css';

function DashboardContent({ tasks, setIsCreateTaskOpen }) {
=======
import TeamMembersPanel from './components/TeamMembersPanel';
import KanbanBoard from './components/KanbanBoard';
import Notifications from './pages/Notifications';
import './App.css';

// Dashboard component defined directly inside App.jsx
function Dashboard({ tasks, setIsCreateTaskOpen }) {
>>>>>>> 2f52257b69d0417c0d3ab1214a3ab531f00c1648
  return (
    <main
      style={{
        flex: 1,
        padding: '20px',
        backgroundColor: '#fafafa',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <h3 style={{ marginBottom: '8px' }}>
            Welcome to CollabBoard
          </h3>

          <p
            style={{
              marginTop: 0,
              color: '#6b7280',
            }}
          >
            Manage your team's tasks and projects.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateTaskOpen(true)}
          style={{
            backgroundColor: '#2563eb',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '11px 18px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          + Create Task
        </button>
      </div>

      {tasks.length > 0 ? (
        <div style={{ marginTop: '30px' }}>
          <h3>Created Tasks</h3>

          {tasks.map((task) => (
            <div
              key={task.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '10px',
                padding: '16px',
                marginBottom: '12px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <strong
                  style={{
                    fontSize: '16px',
                    color: '#1f2937',
                  }}
                >
                  {task.title}
                </strong>

                <span
                  style={{
                    backgroundColor:
                      task.priority === 'High'
                        ? '#fee2e2'
                        : task.priority === 'Medium'
                        ? '#fef3c7'
                        : '#dcfce7',

                    color:
                      task.priority === 'High'
                        ? '#b91c1c'
                        : task.priority === 'Medium'
                        ? '#92400e'
                        : '#166534',

                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                  }}
                >
                  {task.priority}
                </span>
              </div>

              {task.description && (
                <p
                  style={{
                    color: '#6b7280',
                    fontSize: '14px',
                    margin: '10px 0',
                  }}
                >
                  {task.description}
                </p>
              )}

              <div
                style={{
                  display: 'flex',
                  gap: '20px',
                  color: '#6b7280',
                  fontSize: '13px',
                }}
              >
                <span>
                  <strong>Status:</strong> {task.status}
                </span>

                {task.assignee && (
                  <span>
                    <strong>Assignee:</strong> {task.assignee}
                  </span>
                )}

                {task.dueDate && (
                  <span>
                    <strong>Due:</strong> {task.dueDate}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            marginTop: '50px',
            textAlign: 'center',
            color: '#9ca3af',
          }}
        >
          <p>No tasks created yet.</p>

          <p>
            Click <strong>+ Create Task</strong> to add your first task.
          </p>
        </div>
      )}
    </main>
  );
}

function PlaceholderPage({ title }) {
  return (
    <main
      style={{
        flex: 1,
        padding: '40px',
        backgroundColor: '#fafafa',
      }}
    >
      <h1>{title}</h1>

      <p style={{ color: '#6b7280' }}>
        This page will be added by the team member responsible for this
        feature.
      </p>
    </main>
  );
}

function App() {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleCreateTask = (newTask) => {
    setTasks((previousTasks) => [
      ...previousTasks,
      newTask,
    ]);

    setIsCreateTaskOpen(false);
  };

  return (
    <BrowserRouter>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          fontFamily: 'sans-serif',
        }}
      >
<<<<<<< HEAD
        {/* HEADER */}
=======
        {/* Header */}
>>>>>>> 2f52257b69d0417c0d3ab1214a3ab531f00c1648
        <header
          style={{
            height: '60px',
            backgroundColor: '#1f2937',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            justifyContent: 'space-between',
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: '20px',
            }}
          >
            CollabBoard
          </h2>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}
          >
<<<<<<< HEAD
            {/* NOTIFICATION BUTTON */}
=======
            {/* Notification Button */}
>>>>>>> 2f52257b69d0417c0d3ab1214a3ab531f00c1648
            <NavLink
              to="/notifications"
              style={({ isActive }) => ({
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '24px',
                position: 'relative',
                opacity: isActive ? 1 : 0.9,
              })}
              title="Notifications"
            >
              🔔
            </NavLink>

            {/* PROFILE */}
            <NavLink
              to="/profile"
              style={({ isActive }) => ({
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: isActive ? 'bold' : 'normal',
              })}
            >
              👤 Profile
            </NavLink>
          </div>
        </header>

<<<<<<< HEAD
        {/* MAIN LAYOUT */}
=======
        {/* Main Layout */}
>>>>>>> 2f52257b69d0417c0d3ab1214a3ab531f00c1648
        <div
          style={{
            display: 'flex',
            flex: 1,
          }}
        >
<<<<<<< HEAD
          {/* SIDEBAR */}
=======
          {/* Sidebar */}
>>>>>>> 2f52257b69d0417c0d3ab1214a3ab531f00c1648
          <aside
            style={{
              width: '200px',
              backgroundColor: '#f3f4f6',
              padding: '20px',
              borderRight: '1px solid #e5e7eb',
            }}
          >
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
<<<<<<< HEAD
              {/* DASHBOARD */}
=======
              {/* Dashboard */}
>>>>>>> 2f52257b69d0417c0d3ab1214a3ab531f00c1648
              <li style={{ marginBottom: '10px' }}>
                <NavLink
                  to="/"
                  style={({ isActive }) => ({
                    display: 'block',
                    padding: '10px 0',
                    fontWeight: isActive ? 'bold' : 'normal',
                    color: '#1f2937',
                    textDecoration: 'none',
                  })}
                >
                  📊 Dashboard
                </NavLink>
              </li>

              {/* KANBAN */}
              <li style={{ marginBottom: '10px' }}>
                <NavLink
                  to="/board"
                  style={({ isActive }) => ({
                    display: 'block',
                    padding: '10px 0',
                    fontWeight: isActive ? 'bold' : 'normal',
                    color: '#1f2937',
                    textDecoration: 'none',
                  })}
                >
                  📋 Kanban Board
                </NavLink>
              </li>

              {/* MEMBERS */}
              <li style={{ marginBottom: '10px' }}>
                <NavLink
                  to="/members"
                  style={({ isActive }) => ({
                    display: 'block',
                    padding: '10px 0',
                    fontWeight: isActive ? 'bold' : 'normal',
                    color: '#1f2937',
                    textDecoration: 'none',
                  })}
                >
                  👥 Members
                </NavLink>
              </li>

              {/* CALENDAR */}
              <li style={{ marginBottom: '10px' }}>
                <NavLink
                  to="/calendar"
                  style={({ isActive }) => ({
                    display: 'block',
                    padding: '10px 0',
                    fontWeight: isActive ? 'bold' : 'normal',
                    color: '#1f2937',
                    textDecoration: 'none',
                  })}
                >
                  📅 Calendar
                </NavLink>
              </li>
            </ul>
          </aside>

<<<<<<< HEAD
          {/* PAGE CONTENT */}
          <Routes>
            {/* DASHBOARD */}
=======
          {/* Page Content */}
          <Routes>
            {/* Dashboard Route */}
>>>>>>> 2f52257b69d0417c0d3ab1214a3ab531f00c1648
            <Route
              path="/"
              element={
                <DashboardContent
                  tasks={tasks}
                  setIsCreateTaskOpen={setIsCreateTaskOpen}
                />
              }
            />

            {/* NOTIFICATIONS */}
            <Route
              path="/notifications"
              element={<Notifications />}
            />

<<<<<<< HEAD
            {/* KANBAN BOARD */}
=======
            {/* Integrated Kanban Board */}
>>>>>>> 2f52257b69d0417c0d3ab1214a3ab531f00c1648
            <Route
              path="/board"
              element={
                <main
                  style={{
                    flex: 1,
                    padding: '20px',
                    backgroundColor: '#fafafa',
                    overflowY: 'auto',
                  }}
                >
                  <KanbanBoard />
                </main>
              }
            />

            {/* TEAM MEMBERS */}
            <Route
              path="/members"
              element={
                <main
                  style={{
                    flex: 1,
                    padding: '20px',
                    backgroundColor: '#fafafa',
                    overflowY: 'auto',
                  }}
                >
                  <TeamMembersPanel />
                </main>
              }
            />

            {/* CALENDAR */}
            <Route
              path="/calendar"
              element={<PlaceholderPage title="Calendar" />}
            />

            {/* PROFILE */}
            <Route
              path="/profile"
              element={<PlaceholderPage title="Profile" />}
            />
          </Routes>
        </div>

<<<<<<< HEAD
        {/* CREATE TASK MODAL */}
=======
        {/* Create Task Modal */}
>>>>>>> 2f52257b69d0417c0d3ab1214a3ab531f00c1648
        <CreateTaskModal
          isOpen={isCreateTaskOpen}
          onClose={() => setIsCreateTaskOpen(false)}
          onCreate={handleCreateTask}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;