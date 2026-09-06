import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';

import CreateTaskModal from './components/CreateTaskModal';
import TeamMembersPanel from './components/TeamMembersPanel';
import KanbanBoard from './components/KanbanBoard';
import Calendar from './components/Calendar';
import Notifications from './Pages/Notifications';
import UserProfile from './components/UserProfile';
import './App.css';

// Dashboard component defined directly inside App.jsx
function Dashboard({ tasks, setTasks, setIsCreateTaskOpen }) {
  // State for search and filters
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [priority, setPriority] = useState('All');

  // Fetch tasks from backend whenever filters change
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (search) queryParams.append('search', search);
        if (status && status !== 'All') queryParams.append('status', status);
        if (priority && priority !== 'All') queryParams.append('priority', priority);

        const response = await fetch(`http://localhost:5000/api/tasks?${queryParams.toString()}`);
        const data = await response.json();
        
        // Update the tasks state with filtered backend data
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    // Use a small delay (debounce) so it doesn't spam the API on every single keystroke
    const debounceTimer = setTimeout(() => {
      fetchTasks();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [search, status, priority, setTasks]);

  return (
    <main
      style={{
        flex: 1,
        padding: '24px',
        backgroundColor: '#f9fafb',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <div>
          <h2 style={{ margin: 0, color: '#111827' }}>
            Welcome to CollabBoard
          </h2>
          <p style={{ margin: '4px 0 0 0', color: '#6b7280' }}>
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
            padding: '10px 18px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          + Create Task
        </button>
      </div>

      {/* SEARCH AND FILTER UI */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <input
          type="text"
          placeholder="Search tasks by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            fontSize: '14px'
          }}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            backgroundColor: '#fff',
            fontSize: '14px'
          }}
        >
          <option value="All">All Statuses</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            backgroundColor: '#fff',
            fontSize: '14px'
          }}
        >
          <option value="All">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {tasks.length > 0 ? (
        <div>
          <h3 style={{ marginBottom: '16px', color: '#374151' }}>Filtered Tasks</h3>
          {tasks.map((task) => (
            <div
              key={task.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
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
                <strong style={{ fontSize: '16px', color: '#1f2937' }}>
                  {task.title}
                </strong>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span
                    style={{
                      backgroundColor: '#f3f4f6',
                      color: '#4b5563',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                    }}
                  >
                    {task.status}
                  </span>
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
              </div>
              {task.description && (
                <p style={{ color: '#6b7280', fontSize: '14px', margin: '8px 0' }}>
                  {task.description}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            marginTop: '60px',
            textAlign: 'center',
            color: '#9ca3af',
          }}
        >
          <p>No tasks found matching your filters.</p>
        </div>
      )}
    </main>
  );
}

function App() {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleCreateTask = (newTask) => {
    setTasks((previousTasks) => [...previousTasks, newTask]);
    setIsCreateTaskOpen(false);
    // Note: You will eventually need to make a POST request here to save this new task to the backend API!
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
        {/* Light Header Bar */}
        <header
          style={{
            height: '60px',
            backgroundColor: '#ffffff',
            color: '#1f2937',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            padding: '0 24px',
            justifyContent: 'space-between',
          }}
        >
          <h2 style={{ margin: 0, fontSize: '20px', color: '#2563eb' }}>
            CollabBoard
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <NavLink
              to="/notifications"
              style={({ isActive }) => ({
                color: isActive ? '#2563eb' : '#4b5563',
                textDecoration: 'none',
                fontSize: '20px',
              })}
              title="Notifications"
            >
              🔔
            </NavLink>

            <NavLink
              to="/profile"
              style={({ isActive }) => ({
                color: isActive ? '#2563eb' : '#4b5563',
                textDecoration: 'none',
                fontWeight: isActive ? '600' : 'normal',
                fontSize: '15px',
              })}
            >
              👤 Profile
            </NavLink>
          </div>
        </header>

        {/* Workspace Layout */}
        <div style={{ display: 'flex', flex: 1 }}>
          {/* Sidebar */}
          <aside
            style={{
              width: '220px',
              backgroundColor: '#f3f4f6',
              padding: '20px 16px',
              borderRight: '1px solid #e5e7eb',
            }}
          >
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '8px' }}>
                <NavLink
                  to="/"
                  style={({ isActive }) => ({
                    display: 'block',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    fontWeight: isActive ? '600' : 'normal',
                    color: isActive ? '#2563eb' : '#374151',
                    backgroundColor: isActive ? '#eff6ff' : 'transparent',
                    textDecoration: 'none',
                  })}
                >
                  📊 Dashboard
                </NavLink>
              </li>

              <li style={{ marginBottom: '8px' }}>
                <NavLink
                  to="/board"
                  style={({ isActive }) => ({
                    display: 'block',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    fontWeight: isActive ? '600' : 'normal',
                    color: isActive ? '#2563eb' : '#374151',
                    backgroundColor: isActive ? '#eff6ff' : 'transparent',
                    textDecoration: 'none',
                  })}
                >
                  📋 Kanban Board
                </NavLink>
              </li>

              <li style={{ marginBottom: '8px' }}>
                <NavLink
                  to="/members"
                  style={({ isActive }) => ({
                    display: 'block',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    fontWeight: isActive ? '600' : 'normal',
                    color: isActive ? '#2563eb' : '#374151',
                    backgroundColor: isActive ? '#eff6ff' : 'transparent',
                    textDecoration: 'none',
                  })}
                >
                  👥 Members
                </NavLink>
              </li>

              <li style={{ marginBottom: '8px' }}>
                <NavLink
                  to="/calendar"
                  style={({ isActive }) => ({
                    display: 'block',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    fontWeight: isActive ? '600' : 'normal',
                    color: isActive ? '#2563eb' : '#374151',
                    backgroundColor: isActive ? '#eff6ff' : 'transparent',
                    textDecoration: 'none',
                  })}
                >
                  📅 Calendar
                </NavLink>
              </li>
            </ul>
          </aside>

          {/* Page Router */}
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  tasks={tasks}
                  setTasks={setTasks}
                  setIsCreateTaskOpen={setIsCreateTaskOpen}
                />
              }
            />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/board" element={<KanbanBoard />} />
            <Route path="/members" element={<TeamMembersPanel />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </div>

        {/* Modal */}
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