import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  // Sample attendance data
  const attendanceData = [
    { month: 'Jan', attendance: 85 },
    { month: 'Feb', attendance: 92 },
    { month: 'Mar', attendance: 88 },
    { month: 'Apr', attendance: 95 },
    { month: 'May', attendance: 90 },
    { month: 'Jun', attendance: 93 }
  ];

  // State for tasks
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://teachmate-backend.onrender.com/taskmanager/');
      setTasks(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch tasks');
      setLoading(false);
      console.error(err);
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = async (task) => {
    try {
      const response = await axios.put(`https://teachmate-backend.onrender.com/taskmanager/${task.id}`, {
        ...task,
        completed: !task.completed
      });

      // Update the task in the list
      setTasks(tasks.map(t => 
        t.id === task.id ? response.data : t
      ));
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    }
  };

  return (
    <div className="bg-white shadow-lg h-full w-full min-w-3xl min-h-screen rounded-3xl border border-gray-100 p-8">
      {/* Greeting */}
      <div className="mb-8">
        <h2 className="font-bold text-5xl text-gray-800">Hello, Rakesh!</h2>
        <p className="text-gray-500">Welcome to your dashboard</p>
      </div>

      {/* Attendance Chart */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Attendance Overview</h2>
        <div className="w-full h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="attendance" fill="#3182ed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tasks Widget */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 overflow-hidden">Your Tasks</h2>
        
        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 text-red-800">
            {error}
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="p-4 text-center text-gray-500">
            Loading tasks...
          </div>
        )}

        {/* Tasks List */}
        <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {!loading && tasks.map((task) => (
            <div 
              key={task.id} 
              className={`p-3 rounded-lg flex items-center space-x-4 ${
                task.completed 
                  ? 'bg-green-50 border-green-200 border' 
                  : 'bg-gray-50 border-gray-200 border'
              }`}
            >
              <input 
                type="checkbox" 
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className={`flex-grow ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {task.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
