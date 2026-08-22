import React, { useState } from 'react';
import CreateTaskModal from './components/CreateTaskModal';
import Dashboard from './Pages/Dashboard';
import { mockTasks } from './mockData';
import './App.css';

function App() {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [tasks, setTasks] = useState(mockTasks);

  const handleCreateTask = (newTask) => {
    setTasks((previousTasks) => [...previousTasks, newTask]);
    setIsCreateTaskOpen(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Header */}
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

        <div>👤 User Profile</div>
      </header>

      {/* Main Layout */}
      <div
        style={{
          display: 'flex',
          flex: 1,
        }}
      >
        {/* Sidebar */}
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
            <li
              style={{
                padding: '10px 0',
                fontWeight: 'bold',
              }}
            >
              📊 Dashboard
            </li>

            <li
              style={{
                padding: '10px 0',
              }}
            >
              📋 Kanban Board
            </li>

            <li
              style={{
                padding: '10px 0',
              }}
            >
              👥 Members
            </li>

            <li
              style={{
                padding: '10px 0',
              }}
            >
              📅 Calendar
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main
          style={{
            flex: 1,
            padding: '20px',
            backgroundColor: '#fafafa',
            overflowY: 'auto',
          }}
        >
          {/* Create Task Button */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: '20px',
            }}
          >
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

          {/* Member 1 Dashboard */}
          <Dashboard tasks={tasks} />
        </main>
      </div>

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={isCreateTaskOpen}
        onClose={() => setIsCreateTaskOpen(false)}
        onCreate={handleCreateTask}
      />
    </div>
  );
}

export default App;