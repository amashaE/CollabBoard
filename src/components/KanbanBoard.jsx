import React, { useState } from 'react';

const initialTasks = [
  { id: 1, title: 'Design Auth Screens', category: 'UI/UX', priority: 'High', status: 'To Do', assignee: 'Devindi' },
  { id: 2, title: 'Setup MySQL Database', category: 'Backend', priority: 'High', status: 'In Progress', assignee: 'Chamod' },
  { id: 3, title: 'Create Activity Feed Component', category: 'Frontend', priority: 'Medium', status: 'Done', assignee: 'Tharunethu' },
  { id: 4, title: 'Integrate Notification API', category: 'Frontend', priority: 'Low', status: 'To Do', assignee: 'Amasha' },
];

const columns = ['To Do', 'In Progress', 'Done'];

function KanbanBoard() {
  const [tasks, setTasks] = useState(initialTasks);

  const moveTask = (taskId, direction) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const currentIndex = columns.indexOf(task.status);
          const nextIndex = currentIndex + direction;
          if (nextIndex >= 0 && nextIndex < columns.length) {
            return { ...task, status: columns[nextIndex] };
          }
        }
        return task;
      })
    );
  };

  const getPriorityBadgeStyle = (priority) => {
    switch (priority) {
      case 'High':
        return { backgroundColor: '#fee2e2', color: '#b91c1c' };
      case 'Medium':
        return { backgroundColor: '#fef3c7', color: '#92400e' };
      case 'Low':
        return { backgroundColor: '#dcfce7', color: '#166534' };
      default:
        return { backgroundColor: '#f3f4f6', color: '#374151' };
    }
  };

  return (
    <div style={{ padding: '8px' }}>
      <h2 style={{ marginTop: 0, color: '#111827', fontSize: '20px' }}>📋 Kanban Task Board</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '16px' }}>
        {columns.map((column) => {
          const columnTasks = tasks.filter((t) => t.status === column);
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '15px', color: '#374151' }}>{column}</h3>
                <span style={{ backgroundColor: '#e5e7eb', borderRadius: '12px', padding: '2px 8px', fontSize: '12px', fontWeight: 'bold' }}>
                  {columnTasks.length}
                </span>
              </div>

              {columnTasks.map((task) => (
                <div
                  key={task.id}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '12px',
                    marginBottom: '12px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h4 style={{ margin: 0, fontSize: '14px', color: '#111827' }}>{task.title}</h4>
                    <span
                      style={{
                        fontSize: '10px',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontWeight: '600',
                        ...getPriorityBadgeStyle(task.priority),
                      }}
                    >
                      {task.priority}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#6b7280', marginTop: '12px' }}>
                    <span>👤 {task.assignee}</span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {column !== 'To Do' && (
                        <button
                          onClick={() => moveTask(task.id, -1)}
                          style={{ border: 'none', background: '#f3f4f6', cursor: 'pointer', borderRadius: '4px', padding: '2px 6px' }}
                          title="Move Left"
                        >
                          ◀
                        </button>
                      )}
                      {column !== 'Done' && (
                        <button
                          onClick={() => moveTask(task.id, 1)}
                          style={{ border: 'none', background: '#f3f4f6', cursor: 'pointer', borderRadius: '4px', padding: '2px 6px' }}
                          title="Move Right"
                        >
                          ▶
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default KanbanBoard;