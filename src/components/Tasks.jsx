import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
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

  // Add a new task
  const addTask = async () => {
    if (newTask.trim() === '') return;

    try {
      const response = await axios.post('https://teachmate-backend.onrender.com/taskmanager/', {
        title: newTask,
        completed: false
      });

      // Add the newly created task to the list
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (err) {
      setError('Failed to add task');
      console.error(err);
    }
  };

  // Remove a task
  const removeTask = async (taskId) => {
    try {
      await axios.delete(`https://teachmate-backend.onrender.com/taskmanager/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      setError('Failed to delete task');
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

  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <div className="w-full min-w-3xl text-gray-400 min-h-screen rounded-3xl bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-2xl h-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Task Management</h1>
            <div className="mt-2 text-gray-600">
              Total Tasks: {totalTasks} | Completed: {completedTasks}
            </div>
          </div>
        </div>

        {/* Task Input */}
        <div className="p-4 border-b flex space-x-2">
          <input 
            type="text" 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="Enter a new task" 
            className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button 
            onClick={addTask}
            disabled={loading || newTask.trim() === ''}
            className={`
              ${loading || newTask.trim() === '' 
                ? 'bg-blue-300 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
              } 
              text-white px-4 py-2 rounded-lg transition-colors
            `}
          >
            Add Task
          </button>
        </div>

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

        {/* Task List */}
        <div className="flex-grow overflow-y-auto">
          {!loading && tasks.map((task) => (
            <div 
              key={task.id} 
              className={`flex items-center justify-between p-4 border-b ${
                task.completed ? 'bg-green-50' : 'bg-white'
              }`}
            >
              <div className="flex items-center space-x-4">
                <input 
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {task.title}
                </span>
              </div>
              <button 
                onClick={() => removeTask(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tasks;