// backend/Routes/Task.js
const express = require('express');
const Task = require('../Model/TaskMongo');
const router = express.Router();

// Create a new task
const calculateTotalTime = (startTime, endTime) => {
    if (!startTime || !endTime || new Date(endTime) < new Date(startTime)) {
      return 0; // Invalid or incomplete time data
    }
    const diff = new Date(endTime) - new Date(startTime); // Milliseconds
    return Math.round(diff / 1000 / 60); // Convert to minutes
  };
  
  // Middleware to calculate totalTime before saving a task
  const addTotalTimeMiddleware = async (req, res, next) => {
    const { startTime, endTime } = req.body;
    req.body.totalTime = calculateTotalTime(startTime, endTime);
    next();
  };
  
  // Create a new task
  // router.post('/add', addTotalTimeMiddleware, async (req, res) => {
  //   try {
  //     const newTask = new Task(req.body);
  //     await newTask.save();
  //     res.status(201).json({ message: 'Task created successfully', task: newTask });
  //   } catch (error) {
  //     res.status(400).json({ message: 'Error creating task', error });
  //   }
  // });

  // router.post('/add', async (req, res) => {
  //   const { title, priority, status, startTime, endTime } = req.body;
  
  //   try {
  //     const newTask = new Task({ title, priority, status, startTime, endTime });
  //     await newTask.save();
  //     res.status(201).json({ message: 'Task created successfully', task: newTask });
  //   } catch (error) {
  //     res.status(400).json({ message: 'Error creating task', error });
  //   }
  // });

  router.post('/add', async (req, res) => {
    try {
      const { title, priority, startTime, endTime, status } = req.body;
  
      const newTask = new Task({
        title,
        priority,
        startTime,
        endTime,
        status,
      });
  
      const savedTask = await newTask.save();
      res.status(201).json({ message: 'Task created successfully!', task: savedTask });
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ message: 'Failed to create task', error });
    }
  });
  
  // Update a task
  router.put('/update/:id', addTotalTimeMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
      const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
      res.status(400).json({ message: 'Error updating task', error });
    }
  });

// Fetch all tasks
router.get('/get', async (req, res) => {
    try {
      const tasks = await Task.find();
      
      // Add totalTime for completed tasks
      const tasksWithTime = tasks.map(task => {
        const totalTime = task.status === 'Completed' 
          ? (new Date(task.endTime) - new Date(task.startTime)) / 1000 / 60 // In minutes
          : 0;
        return { ...task.toObject(), totalTime };
      });
  
      res.status(200).json(tasksWithTime);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tasks', error });
    }
  });

// Update a task


// Delete a task
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting task', error });
  }
});

module.exports = router;
