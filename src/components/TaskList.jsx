import React, { useEffect, useState } from "react";
import axios from "axios";


const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState("all");

  const pageSize = 5; // Number of tasks per page

  // Fetch tasks from API
  const fetchTasks = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `http://localhost:5000/api/tasks?page=${currentPage}&limit=${pageSize}&status=${filter}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include JWT token
          },
        }
      );
      setTasks(response.data.tasks);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError("Failed to fetch tasks. Please try again.");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, [currentPage, filter]);

  // Handle task deletion
  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchTasks(); 
    } catch (err) {
      alert("Failed to delete task. Please try again.");
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1); 
  };

  return (
    <div className="task-list">
      <h2>Task List</h2>

      {error && <p className="error-message">{error}</p>}

      <div className="filter">
        <label htmlFor="filter">Filter by Status:</label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.startDate}</td>
                <td>{task.endDate}</td>
                <td>{task.status}</td>
                <td>{task.progress}%</td>
                <td>
                  <button
                    onClick={() => (window.location.href = `/edit-task/${task._id}`)}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(task._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskList;
