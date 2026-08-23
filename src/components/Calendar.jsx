import React, { useState } from 'react';
import './Calendar.css';
import { mockTasks } from '../mockData.js';

function Calendar() {
  const [tasks] = useState(mockTasks || []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#fafafa', minHeight: '100%' }}>
      <h2 style={{ margin: '0 0 20px 0', color: '#111827', fontSize: '22px' }}>
        📅 Deadlines & Calendar
      </h2>

      <div style={{ display: 'grid', gap: '12px' }}>
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#111827' }}>
                {task.title}
              </h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>
                👤 Assigned to: {task.assignee}
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '600',
                  backgroundColor: '#eff6ff',
                  color: '#1d4ed8',
                  marginBottom: '4px',
                }}
              >
                🗓️ {task.date}
              </span>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>
                Status: <strong>{task.status}</strong>
              </div>
            </div>
          </div>
        ))}

        {tasks.length === 0 && (
          <div style={{ textAlign: 'center', color: '#9ca3af', padding: '40px' }}>
            No upcoming deadlines found.
          </div>
        )}
      </div>
    </div>
  );
}

export default Calendar;