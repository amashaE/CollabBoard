import React, { useState } from 'react';
import CreateTaskModal from './components/CreateTaskModal';
import './App.css';

function App() {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

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
          color: '#fff',
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
          }}
        >
          {/* Page Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <h3
                style={{
                  marginBottom: '8px',
                }}
              >
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

            {/* Create Task Button */}
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

          {/* Created Tasks */}
          {tasks.length > 0 && (
            <div
              style={{
                marginTop: '30px',
              }}
            >
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
          )}

          {/* Empty State */}
          {tasks.length === 0 && (
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