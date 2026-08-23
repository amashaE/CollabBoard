import React, { useEffect, useState } from 'react';
import './TaskDetailsModal.css';

function TaskDetailsModal({ task, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '',
    priority: '',
    assignee: '',
    date: '',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || '',
        priority: task.priority || '',
        assignee: task.assignee || '',
        date: task.date || '',
      });
    }
  }, [task]);

  if (!isOpen || !task) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave({
      ...task,
      ...formData,
    });

    onClose();
  };

  return (
    <div className="task-modal-overlay" onClick={onClose}>
      <div
        className="task-modal"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="task-modal-header">
          <h2>Task Details</h2>

          <button
            type="button"
            className="task-modal-close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="task-modal-body">
          <label>
            Task Title
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter task description..."
            />
          </label>

          <div className="task-form-row">
            <label>
              Status
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </label>

            <label>
              Priority
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </label>
          </div>

          <div className="task-form-row">
            <label>
              Assignee
              <input
                type="text"
                name="assignee"
                value={formData.assignee}
                onChange={handleChange}
              />
            </label>

            <label>
              Due Date
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="task-modal-footer">
          <button
            type="button"
            className="cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className="save-button"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsModal;