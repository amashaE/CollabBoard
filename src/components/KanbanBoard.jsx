import React, { useState } from 'react';
import TaskDetailsModal from '../components/TaskDetailsModal';

const initialTasks = [
  {
    id: 1,
    title: 'Design Auth Screens',
    description: 'Create responsive login and registration screens.',
    category: 'UI/UX',
    priority: 'High',
    status: 'To Do',
    assignee: 'Devindi',
    date: '2026-08-25',
  },
  {
    id: 2,
    title: 'Setup MySQL Database',
    description: 'Create and configure the MySQL database for the project.',
    category: 'Backend',
    priority: 'High',
    status: 'In Progress',
    assignee: 'Chamod',
    date: '2026-08-26',
  },
  {
    id: 3,
    title: 'Create Activity Feed Component',
    description: 'Build the activity feed component for the dashboard.',
    category: 'Frontend',
    priority: 'Medium',
    status: 'Done',
    assignee: 'Tharunethu',
    date: '2026-08-24',
  },
  {
    id: 4,
    title: 'Integrate Notification API',
    description: 'Connect the notification system to the application.',
    category: 'Frontend',
    priority: 'Low',
    status: 'To Do',
    assignee: 'Amasha',
    date: '2026-08-28',
  },
];

const columns = ['To Do', 'In Progress', 'Done'];

function KanbanBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null);

  const moveTask = (taskId, direction) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) => {
        if (task.id === taskId) {
          const currentIndex = columns.indexOf(task.status);
          const nextIndex = currentIndex + direction;

          if (nextIndex >= 0 && nextIndex < columns.length) {
            return {
              ...task,
              status: columns[nextIndex],
            };
          }
        }

        return task;
      })
    );
  };

  const handleSaveTask = (updatedTask) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === updatedTask.id
          ? updatedTask
          : task
      )
    );

    setSelectedTask(null);
  };

  const getPriorityBadgeStyle = (priority) => {
    switch (priority) {
      case 'High':
        return {
          backgroundColor: '#fee2e2',
          color: '#b91c1c',
        };

      case 'Medium':
        return {
          backgroundColor: '#fef3c7',
          color: '#92400e',
        };

      case 'Low':
        return {
          backgroundColor: '#dcfce7',
          color: '#166534',
        };

      default:
        return {
          backgroundColor: '#f3f4f6',
          color: '#374151',
        };
    }
  };

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#fafafa',
        minHeight: '100%',
      }}
    >
      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              color: '#111827',
              fontSize: '22px',
            }}
          >
            📋 Kanban Task Board
          </h2>

          <p
            style={{
              margin: '6px 0 0',
              color: '#6b7280',
              fontSize: '14px',
            }}
          >
            Click a task to view or edit its details.
          </p>
        </div>
      </div>

      {/* Kanban Columns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        }}
      >
        {columns.map((column) => {
          const columnTasks = tasks.filter(
            (task) => task.status === column
          );

          return (
            <div
              key={column}
              style={{
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '16px',
                minHeight: '400px',
              }}
            >
              {/* Column Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: '15px',
                    color: '#374151',
                  }}
                >
                  {column}
                </h3>

                <span
                  style={{
                    backgroundColor: '#e5e7eb',
                    borderRadius: '12px',
                    padding: '2px 8px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  {columnTasks.length}
                </span>
              </div>

              {/* Task Cards */}
              {columnTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '12px',
                    marginBottom: '12px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    cursor: 'pointer',
                    transition: 'box-shadow 0.2s',
                  }}
                >
                  {/* Task Title + Priority */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '8px',
                      gap: '10px',
                    }}
                  >
                    <h4
                      style={{
                        margin: 0,
                        fontSize: '14px',
                        color: '#111827',
                      }}
                    >
                      {task.title}
                    </h4>

                    <span
                      style={{
                        fontSize: '10px',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontWeight: '600',
                        whiteSpace: 'nowrap',
                        ...getPriorityBadgeStyle(task.priority),
                      }}
                    >
                      {task.priority}
                    </span>
                  </div>

                  {/* Category */}
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      marginBottom: '10px',
                    }}
                  >
                    {task.category}
                  </div>

                  {/* Assignee + Buttons */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '12px',
                      color: '#6b7280',
                      marginTop: '12px',
                    }}
                  >
                    <span>
                      👤 {task.assignee}
                    </span>

                    <div
                      style={{
                        display: 'flex',
                        gap: '4px',
                      }}
                    >
                      {/* Move Left */}
                      {column !== 'To Do' && (
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            moveTask(task.id, -1);
                          }}
                          style={{
                            border: 'none',
                            background: '#f3f4f6',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            padding: '2px 6px',
                          }}
                          title="Move Left"
                        >
                          ◀
                        </button>
                      )}

                      {/* Move Right */}
                      {column !== 'Done' && (
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            moveTask(task.id, 1);
                          }}
                          style={{
                            border: 'none',
                            background: '#f3f4f6',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            padding: '2px 6px',
                          }}
                          title="Move Right"
                        >
                          ▶
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Click hint */}
                  <div
                    style={{
                      marginTop: '10px',
                      paddingTop: '8px',
                      borderTop: '1px solid #f3f4f6',
                      fontSize: '11px',
                      color: '#9ca3af',
                    }}
                  >
                    Click to view details
                  </div>
                </div>
              ))}

              {/* Empty Column */}
              {columnTasks.length === 0 && (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '30px 10px',
                    color: '#9ca3af',
                    fontSize: '13px',
                  }}
                >
                  No tasks
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Task Details Modal */}
      <TaskDetailsModal
        task={selectedTask}
        isOpen={selectedTask !== null}
        onClose={() => setSelectedTask(null)}
        onSave={handleSaveTask}
      />
    </div>
  );
}

export default KanbanBoard;