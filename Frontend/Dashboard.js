import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Style/Dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [summary, setSummary] = useState({
    totalTasks: 0,
    completedPercentage: 0,
    pendingPercentage: 0,
    averageCompletionTime: 0,
  });
  const [pendingSummary, setPendingSummary] = useState({
    totalPendingTasks: 0,
    totalTimeCompleted: 0,
    totalTimeLeft: 0,
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/tasks/get');
        const tasks = response.data;
        setTasks(tasks);
        calculateSummary(tasks);
        calculatePendingSummary(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const calculateSummary = (tasks) => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.status === 'Completed');
    const pendingTasks = tasks.filter((task) => task.status === 'Pending');
  
    const completedPercentage = totalTasks > 0
      ? ((completedTasks.length / totalTasks) * 100).toFixed(2)
      : 0;
  
    const pendingPercentage = totalTasks > 0
      ? ((pendingTasks.length / totalTasks) * 100).toFixed(2)
      : 0;
  
    const totalTime = completedTasks.reduce((sum, task) => sum + task.totalTime, 0);
  
    const averageCompletionTime = completedTasks.length
      ? (totalTime / completedTasks.length).toFixed(2)
      : 0;
  
    setSummary({
      totalTasks,
      completedPercentage,
      pendingPercentage,
      averageCompletionTime,
    });
  };
  

  const calculatePendingSummary = (tasks) => {
    const pendingTasks = tasks.filter((task) => task.status === 'Pending');
    const totalPendingTasks = pendingTasks.length;
  
    const totalTimeCompleted = tasks
      .filter((task) => task.status === 'Completed')
      .reduce((sum, task) => sum + task.totalTime, 0);
  
    const totalTimeLeft = pendingTasks.reduce((sum, task) => {
      const startTime = new Date(task.startTime);
      const endTime = task.endTime ? new Date(task.endTime) : new Date();
      return sum + Math.max((endTime - startTime) / 1000 / 60, 0); // Ensure non-negative
    }, 0);
  
    setPendingSummary({
      totalPendingTasks,
      totalTimeCompleted: totalTimeCompleted.toFixed(2),
      totalTimeLeft: totalTimeLeft.toFixed(2),
    });
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="summary">
        <h2 className="summary-title">Summary</h2>
        <table className="summary-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Tasks</td>
              <td>{summary.totalTasks}</td>
            </tr>
            <tr>
              <td>Completed Tasks (%)</td>
              <td>{summary.completedPercentage}%</td>
            </tr>
            <tr>
              <td>Pending Tasks (%)</td>
              <td>{summary.pendingPercentage}%</td>
            </tr>
            <tr>
              <td>Average Completion Time</td>
              <td>{summary.averageCompletionTime} minutes</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="pending-summary">
        <h2 className="pending-summary-title">Pending Task Summary</h2>
        <table className="pending-summary-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Pending Tasks</td>
              <td>{pendingSummary.totalPendingTasks}</td>
            </tr>
            <tr>
              <td>Total Time Completed</td>
              <td>{pendingSummary.totalTimeCompleted} minutes</td>
            </tr>
            <tr>
              <td>Total Time Left</td>
              <td>{pendingSummary.totalTimeLeft} minutes</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
