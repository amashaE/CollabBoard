import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DeadlinesView.css';

const DeadlinesView = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchDeadlines();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const fetchDeadlines = async () => {
    try {
      setLoading(true);
      const params = {};
      if (statusFilter) params.status = statusFilter;

      const res = await axios.get('/api/calendar/deadlines', { params });
      setTasks(res.data.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching deadlines:', err);
      setError('Failed to load deadlines. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isOverdue = (dateStr) => new Date(dateStr) < new Date();

  const getDaysRemaining = (dateStr) => {
    const diff = Math.ceil(
      (new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24)
    );
    if (diff < 0) return `${Math.abs(diff)} day(s) overdue`;
    if (diff === 0) return 'Due today';
    return `${diff} day(s) left`;
  };

  if (loading) return <div className="deadlines-loading">Loading deadlines...</div>;
  if (error) return <div className="deadlines-error">{error}</div>;

  return (
    <div className="deadlines-container">
      <div className="deadlines-header">
        <h2>Upcoming Deadlines</h2>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="status-filter"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {tasks.length === 0 ? (
        <p className="no-deadlines">No upcoming deadlines found.</p>
      ) : (
        <ul className="deadlines-list">
          {tasks.map((task) => (
            <li
              key={task._id}
              className={`deadline-item ${isOverdue(task.dueDate) ? 'overdue' : ''}`}
            >
              <div className="deadline-main">
                <h4>{task.title}</h4>
                <p className="deadline-desc">{task.description}</p>
              </div>
              <div className="deadline-meta">
                <span className="deadline-date">{formatDate(task.dueDate)}</span>
                <span className="deadline-days">{getDaysRemaining(task.dueDate)}</span>
                <span className={`deadline-status status-${task.status}`}>
                  {task.status}
                </span>
                {task.assignedTo && (
                  <span className="deadline-assignee">{task.assignedTo.name}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeadlinesView;
