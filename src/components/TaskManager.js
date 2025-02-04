import React, { useState, useEffect } from 'react';
import { Card, CardContent, TextField, Button, List, ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import { MdDelete, MdCheckCircle } from 'react-icons/md';
import axios from 'axios';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://backend-client-dashboard.onrender.com/api/tasks');
        setTasks(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch tasks');
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Add new task
  const addTask = async () => {
    if (newTask.trim() !== '') {
      try {
        const response = await axios.post('https://backend-client-dashboard.onrender.com/api/tasks', { text: newTask });
        setTasks([...tasks, response.data]);
        setNewTask('');
      } catch (err) {
        setError('Failed to add task');
      }
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`https://backend-client-dashboard.onrender.com/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  // Toggle task completion status
  const toggleComplete = async (id, completed) => {
    try {
      const response = await axios.patch(`https://backend-client-dashboard.onrender.com/api/tasks/${id}`, {
        completed: !completed
      });
      setTasks(tasks.map(task => (task._id === id ? response.data : task)));
    } catch (err) {
      setError('Failed to update task');
    }
  };

  if (loading) return <Typography>Loading tasks...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Card sx={{ padding: 3, marginTop: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#1976d2' }}>
          Task Manager
        </Typography>

        {/* Task input field */}
        <TextField
          label="New Task"
          variant="outlined"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addTask}
          sx={{
            width: '100%',
            padding: '12px 0',
            '&:hover': {
              backgroundColor: '#1976d2',
              boxShadow: 6,
            },
          }}
        >
          Add Task
        </Button>

        {/* Task List */}
        <List sx={{ marginTop: 2 }}>
          {tasks.map((task) => (
            <ListItem key={task._id} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1, '&:hover': { backgroundColor: '#f5f5f5' } }}>
              <ListItemText
                primary={task.text}
                sx={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? 'gray' : 'initial',
                }}
              />
              <div>
                <IconButton
                  onClick={() => toggleComplete(task._id, task.completed)}
                  color="success"
                  sx={{
                    '&:hover': {
                      color: '#388e3c',
                    },
                  }}
                >
                  <MdCheckCircle />
                </IconButton>
                <IconButton
                  onClick={() => deleteTask(task._id)}
                  color="error"
                  sx={{
                    '&:hover': {
                      color: '#d32f2f',
                    },
                  }}
                >
                  <MdDelete />
                </IconButton>
              </div>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TaskManager;
