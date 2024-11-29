import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Style/TaskList.css'; // Import the CSS file for styling

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [editTask, setEditTask] = useState(null); // Holds the task being edited
  const [updatedTask, setUpdatedTask] = useState({
    title: '',
    priority: '',
    status: '',
    startTime: '',
    endTime: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'asc' });

  useEffect(() => {
    // Fetch tasks from backend
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/tasks/get');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleSelectTask = (id) => {
    if (selectedTasks.includes(id)) {
      setSelectedTasks(selectedTasks.filter((taskId) => taskId !== id));
    } else {
      setSelectedTasks([...selectedTasks, id]);
    }
  };

  const calculateTotalTime = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const totalTime = (end - start) / 1000 / 60; // Total time in minutes
    return totalTime;
  };

  const handleEditTask = (task) => {
    setEditTask(task._id);
    setUpdatedTask({
      title: task.title,
      priority: task.priority,
      status: task.status,
      startTime: task.startTime,
      endTime: task.endTime,
    });
  };

  const handleUpdateTask = async () => {
    try {
      const response = await axios.put(
        `http://localhost:9000/api/tasks/update/${editTask}`,
        updatedTask
      );
      alert(response.data.message);
      setEditTask(null);
      // Refresh tasks
      const refreshedTasks = await axios.get('http://localhost:9000/api/tasks/get');
      setTasks(refreshedTasks.data);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const response = await axios.delete(`http://localhost:9000/api/tasks/delete/${id}`);
        alert(response.data.message);
        // Refresh tasks
        setTasks(tasks.filter((task) => task._id !== id));
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Sort function
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key, direction });
  };

  // Sorting and filtering tasks
  const filteredTasks = tasks
    .filter((task) => {
      const term = searchTerm.toLowerCase();
      return (
        String(task.title).toLowerCase().includes(term) ||
        String(task.priority).toLowerCase().includes(term) ||
        String(task.status).toLowerCase().includes(term)
      );
    })
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

  return (
    <div className="task-list">
      <h1>Task List</h1>

      <input
        type="text"
        placeholder="Search tasks"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />

      <table className="task-table">
        <thead>
          <tr>
            <th>Select</th>
            <th onClick={() => handleSort('title')}>Title</th>
            <th onClick={() => handleSort('priority')}>Priority</th>
            <th onClick={() => handleSort('status')}>Status</th>
            <th onClick={() => handleSort('startTime')}>Start Time</th>
            <th onClick={() => handleSort('endTime')}>End Time</th>
            <th>Total Time (min)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task._id}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleSelectTask(task._id)}
                  checked={selectedTasks.includes(task._id)}
                />
              </td>
              <td>{task.title}</td>
              <td>{task.priority}</td>
              <td>{task.status}</td>
              <td>{new Date(task.startTime).toLocaleString()}</td>
              <td>{new Date(task.endTime).toLocaleString()}</td>
              <td>{calculateTotalTime(task.startTime, task.endTime)}</td>
              <td>
                <button onClick={() => handleEditTask(task)}>Edit</button>
                <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editTask && (
        <div className="edit-task-form">
          <h2>Edit Task</h2>
          <label>
            Title:
            <input
              type="text"
              value={updatedTask.title}
              onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })}
            />
          </label>
          <label>
            Priority:
            <input
              type="text"
              value={updatedTask.priority}
              onChange={(e) => setUpdatedTask({ ...updatedTask, priority: e.target.value })}
            />
          </label>
          <label>
            Status:
            <input
              type="text"
              value={updatedTask.status}
              onChange={(e) => setUpdatedTask({ ...updatedTask, status: e.target.value })}
            />
          </label>
          <label>
            Start Time:
            <input
              type="datetime-local"
              value={new Date(updatedTask.startTime).toISOString().slice(0, 16)}
              onChange={(e) => setUpdatedTask({ ...updatedTask, startTime: e.target.value })}
            />
          </label>
          <label>
            End Time:
            <input
              type="datetime-local"
              value={new Date(updatedTask.endTime).toISOString().slice(0, 16)}
              onChange={(e) => setUpdatedTask({ ...updatedTask, endTime: e.target.value })}
            />
          </label>
          <button onClick={handleUpdateTask}>Save Changes</button>
          <button onClick={() => setEditTask(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
