import React, { useState } from 'react';
import axios from 'axios';
import './Style/Task.css';

const Task = () => {
  const [showModal, setShowModal] = useState(false);
  const [taskData, setTaskData] = useState({
    title: '',
    priority: '',
    startTime: '',
    endTime: '',
    status: 'pending',
  });

  const handleAddTaskClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTaskData({ ...taskData, [name]: value });
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:9000/api/tasks/add', taskData);

  //     if (response.status === 201) {
  //       alert('Task added successfully!');
  //       setTaskData({
  //         title: '',
  //         priority: '',
  //         startTime: '',
  //         endTime: '',
  //         status: 'pending',
  //       }); // Reset form
  //       setShowModal(false); // Close the modal
  //     }
  //   } catch (error) {
  //     console.error('Error adding task:', error);
  //     alert(error.response?.data?.message || 'Failed to add task.');
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting task:', taskData);
    try {
      const response = await axios.post('http://localhost:9000/api/tasks/add', taskData);
      alert('Task created successfully!');
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Failed to create task.');
    }
  };
  return (
    <div className="task-page">
      <h1 className="task-title">Tasks</h1>
      <button className="add-task-button" onClick={handleAddTaskClick}>
        Add Task
      </button>

      {showModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-content">
            <h2 className="modal-title">Add Task</h2>
            <form className="task-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={taskData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="priority">Priority (1-5):</label>
                <input
                  id="priority"
                  type="number"
                  name="priority"
                  min="1"
                  max="5"
                  value={taskData.priority}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="startTime">Start Time:</label>
                <input
                  id="startTime"
                  type="datetime-local"
                  name="startTime"
                  value={taskData.startTime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="endTime">End Time:</label>
                <input
                  id="endTime"
                  type="datetime-local"
                  name="endTime"
                  value={taskData.endTime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status:</label>
                <select
                  id="status"
                  name="status"
                  value={taskData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="finished">Completed</option>
                </select>
              </div>
              <div className="button-group">
                <button type="submit" className="submit-button">
                  Submit
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
