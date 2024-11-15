import React, { useState, useEffect } from 'react';
import axios from 'axios';


const TaskForm = ({ task, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'pending', 
    progress: 0, 
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        startDate: task.startDate || '',
        endDate: task.endDate || '',
        status: task.status || 'pending',
        progress: task.progress || 0,
      });
    }
  }, [task]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'progress' ? Math.min(Math.max(value, 0), 100) : value, // Clamp progress to 0-100
    });
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (task) {
        // Update task
        await axios.put(`http://localhost:5000/api/tasks/${task._id}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      } else {
        // Create task
        await axios.post('http://localhost:5000/api/tasks', formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      }
      onSave(); // Notify parent component
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="task-form bg-primary text-white mt-5">
      <h2>{task ? 'Edit Task' : 'Create Task'}</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Task Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Task Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="progress">Progress (%)</label>
          <input
            type="number"
            id="progress"
            name="progress"
            value={formData.progress}
            onChange={handleChange}
            required
            min="0"
            max="100"
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
          </button>
          <button type="button" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
