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

  const getPriorityClass = (priority) => {
    if (priority === 'High') return 'priority-high';
    if (priority === 'Medium') return 'priority-medium';
    return 'priority-low';
  };

  return (
    <div className="app-shell">

     
      <header className="top-header">

        <div className="brand">
          <div className="brand-icon">✦</div>
          <div>
            <h1>CollabBoard</h1>
            <span>Team Workspace</span>
          </div>
        </div>

        <div className="header-right">
          <button className="notification-btn" type="button">
            🔔
            <span className="notification-dot"></span>
          </button>

          <div className="profile">
            <div className="profile-avatar">M</div>
            <div className="profile-info">
              <strong>User Profile</strong>
              <span>Team Member</span>
            </div>
            <span className="profile-arrow">⌄</span>
          </div>
        </div>

      </header>

      
      <div className="app-body">

        
        <aside className="sidebar">

          <div className="workspace-title">
            <span className="workspace-icon">🚀</span>
            <div>
              <strong>My Workspace</strong>
              <small>Project Management</small>
            </div>
          </div>

          <div className="menu-section">
            <span className="menu-label">MAIN MENU</span>

            <ul className="sidebar-menu">

              <li className="active">
                <span>📊</span>
                <span>Dashboard</span>
              </li>

              <li>
                <span>📋</span>
                <span>Kanban Board</span>
              </li>

              <li>
                <span>👥</span>
                <span>Members</span>
              </li>

              <li>
                <span>📅</span>
                <span>Calendar</span>
              </li>

            </ul>
          </div>

          <div className="sidebar-bottom">

            <div className="upgrade-card">
              <div className="upgrade-icon">⚡</div>
              <strong>Keep things moving!</strong>
              <p>Create tasks and keep your team organized.</p>
              <button type="button">Get Started →</button>
            </div>

            <div className="sidebar-user">
              <div className="profile-avatar small">M</div>
              <div>
                <strong>My Account</strong>
                <span>Online</span>
              </div>
            </div>

          </div>

        </aside>

        
        <main className="main-content">

          {/* Welcome section */}
          <section className="welcome-section">

            <div>
              <span className="welcome-tag">✨ GOOD TO SEE YOU</span>

              <h2>
                Welcome to <span>CollabBoard</span>
              </h2>

              <p>
                Manage your team's tasks, collaborate and keep your projects
                moving forward.
              </p>
            </div>

            <button
              type="button"
              className="create-task-btn"
              onClick={() => setIsCreateTaskOpen(true)}
            >
              <span>＋</span>
              Create Task
            </button>

          </section>

          
          <section className="stats-grid">

            <div className="stat-card blue">
              <div className="stat-icon">📋</div>
              <div>
                <span>Total Tasks</span>
                <strong>{tasks.length}</strong>
              </div>
              <div className="stat-decoration">↗</div>
            </div>

            <div className="stat-card purple">
              <div className="stat-icon">⚡</div>
              <div>
                <span>In Progress</span>
                <strong>
                  {tasks.filter((task) => task.status === 'Doing').length}
                </strong>
              </div>
              <div className="stat-decoration">↗</div>
            </div>

            <div className="stat-card green">
              <div className="stat-icon">✓</div>
              <div>
                <span>Completed</span>
                <strong>
                  {tasks.filter((task) => task.status === 'Done').length}
                </strong>
              </div>
              <div className="stat-decoration">↗</div>
            </div>

            <div className="stat-card orange">
              <div className="stat-icon">🔥</div>
              <div>
                <span>High Priority</span>
                <strong>
                  {tasks.filter((task) => task.priority === 'High').length}
                </strong>
              </div>
              <div className="stat-decoration">↗</div>
            </div>

          </section>

         
          <section className="task-section">

            <div className="section-header">
              <div>
                <h3>Recent Tasks</h3>
                <p>Your latest project activities</p>
              </div>

              {tasks.length > 0 && (
                <span className="task-count">
                  {tasks.length} {tasks.length === 1 ? 'Task' : 'Tasks'}
                </span>
              )}
            </div>

            
            {tasks.length > 0 ? (

              <div className="task-list">

                {tasks.map((task) => (

                  <div className="task-card" key={task.id}>

                    <div className="task-main">

                      <div className="task-check">
                        ✓
                      </div>

                      <div className="task-content">

                        <div className="task-title-row">

                          <h4>{task.title}</h4>

                          <span
                            className={`priority-badge ${getPriorityClass(
                              task.priority
                            )}`}
                          >
                            {task.priority}
                          </span>

                        </div>

                        {task.description && (
                          <p>{task.description}</p>
                        )}

                        <div className="task-meta">

                          <span>
                            📌 {task.status}
                          </span>

                          {task.assignee && (
                            <span>
                              👤 {task.assignee}
                            </span>
                          )}

                          {task.dueDate && (
                            <span>
                              📅 {task.dueDate}
                            </span>
                          )}

                        </div>

                      </div>

                    </div>

                    <button
                      className="task-more"
                      type="button"
                    >
                      ⋮
                    </button>

                  </div>

                ))}

              </div>

            ) : (

             

              <div className="empty-state">

                <div className="empty-illustration">
                  <div className="empty-circle">
                    📝
                  </div>
                  <div className="floating-star star-one">✦</div>
                  <div className="floating-star star-two">✦</div>
                  <div className="floating-star star-three">✧</div>
                </div>

                <h3>No tasks yet</h3>

                <p>
                  Your workspace is ready! Create your first task
                  and start organizing your project.
                </p>

                <button
                  type="button"
                  className="empty-create-btn"
                  onClick={() => setIsCreateTaskOpen(true)}
                >
                  ＋ Create Your First Task
                </button>

              </div>

            )}

          </section>

        </main>

      </div>

    
      <CreateTaskModal
        isOpen={isCreateTaskOpen}
        onClose={() => setIsCreateTaskOpen(false)}
        onCreate={handleCreateTask}
      />

    </div>
  );
}

export default App;