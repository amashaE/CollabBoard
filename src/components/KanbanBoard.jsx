import React, { useEffect, useState } from 'react';
import TaskDetailsModal from './TaskDetailsModal';
import SearchFilterBar from './SearchFilterBar';

const columns = ['To Do', 'In Progress', 'Done'];

function KanbanBoard({ tasks: externalTasks, onTasksChange }) {
  const [tasks, setTasks] = useState(externalTasks || []);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Search and filter state
  const [filters, setFilters] = useState({
    searchText: '',
    priority: 'All',
    status: 'All',
  });

  // Get tasks from MySQL backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          'http://localhost:5000/api/tasks'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }

        const data = await response.json();

        setTasks(data);

        if (onTasksChange) {
          onTasksChange(data);
        }

        setError('');
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Could not load tasks from the backend.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [onTasksChange]);

  // Update local tasks if parent sends new tasks
  useEffect(() => {
    if (externalTasks) {
      setTasks(externalTasks);
    }
  }, [externalTasks]);

  // Receive search/filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Filter tasks for display only
  const filteredTasks = tasks.filter((task) => {
    const searchValue = filters.searchText.trim().toLowerCase();

    const matchesSearch =
      !searchValue ||
      task.title?.toLowerCase().includes(searchValue) ||
      task.description?.toLowerCase().includes(searchValue) ||
      task.category?.toLowerCase().includes(searchValue) ||
      task.assignee?.toLowerCase().includes(searchValue);

    const matchesPriority =
      filters.priority === 'All' ||
      task.priority === filters.priority;

    const matchesStatus =
      filters.status === 'All' ||
      task.status === filters.status;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  // Move task between Kanban columns
  const moveTask = async (taskId, direction) => {
    const currentTask = tasks.find(
      (task) => task.id === taskId
    );

    if (!currentTask) {
      return;
    }

    const currentIndex = columns.indexOf(currentTask.status);
    const nextIndex = currentIndex + direction;

    if (nextIndex < 0 || nextIndex >= columns.length) {
      return;
    }

    const updatedTask = {
      ...currentTask,
      status: columns[nextIndex],
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: updatedTask.status,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const savedTask = await response.json();

      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? savedTask : task
      );

      setTasks(updatedTasks);

      if (onTasksChange) {
        onTasksChange(updatedTasks);
      }
    } catch (err) {
      console.error('Error moving task:', err);
      alert('Could not update the task.');
    }
  };

  // Save task changes from Task Details Modal
  const handleSaveTask = async (updatedTask) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${updatedTask.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTask),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const savedTask = await response.json();

      const updatedTasks = tasks.map((task) =>
        task.id === savedTask.id ? savedTask : task
      );

      setTasks(updatedTasks);

      if (onTasksChange) {
        onTasksChange(updatedTasks);
      }

      setSelectedTask(null);
    } catch (err) {
      console.error('Error saving task:', err);
      alert('Could not save task changes.');
    }
  };

  // Priority badge styling
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

  // Loading state
  if (loading) {
    return (
      <div
        style={{
          padding: '40px',
          textAlign: 'center',
          color: '#6b7280',
        }}
      >
        Loading tasks...
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        style={{
          padding: '40px',
          textAlign: 'center',
          color: '#b91c1c',
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#fafafa',
        minHeight: '100%',
      }}
    >
      {/* Header */}
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

      {/* Search and Filter Bar */}
      <SearchFilterBar
        onFilterChange={handleFilterChange}
      />

      {/* Kanban Columns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginTop: '20px',
        }}
      >
        {columns.map((column) => {
          const columnTasks = filteredTasks.filter(
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

              {/* Tasks */}
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
                  }}
                >
                  {/* Task title + priority */}
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
                    {task.category || 'General'}
                  </div>

                  {/* Assignee + movement buttons */}
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
                      👤 {task.assignee || 'Unassigned'}
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
                          onClick={(e) => {
                            e.stopPropagation();
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
                          onClick={(e) => {
                            e.stopPropagation();
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

                  {/* Details hint */}
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

              {/* Empty column */}
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