import React, { useContext, useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Paper, CircularProgress, Alert, IconButton, Tooltip } from '@mui/material';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import TaskContext from '../context/task/TaskContext';
import AuthContext from '../context/auth/AuthContext';
import TaskForm from '../components/tasks/TaskForm';
import TaskItem from '../components/tasks/TaskItem';
import TaskFilter from '../components/tasks/TaskFilter';

const Tasks = () => {
  const { tasks, getTasks, loading, error: taskError, clearErrors: clearTaskErrors, clearTasks } = useContext(TaskContext);
  const { user, success: authSuccess, clearErrors: clearAuthErrors } = useContext(AuthContext);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    priority: 'all',
    status: 'all'
  });

  // Fetch tasks on component mount
  useEffect(() => {
    getTasks();
    // eslint-disable-next-line
  }, []);

  // Handle alert auto-close
  useEffect(() => {
    if (authSuccess || taskError) {
      const timer = setTimeout(() => {
        if (authSuccess) clearAuthErrors();
        if (taskError) clearTaskErrors();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [authSuccess, taskError, clearAuthErrors, clearTaskErrors]);

  // Apply filters to tasks
  useEffect(() => {
    let filtered = [...tasks];
    const { search, priority, status } = filters;

    // Filter by search term
    if (search) {
      filtered = filtered.filter(
        task =>
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          (task.description && 
            task.description.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Filter by priority
    if (priority !== 'all') {
      filtered = filtered.filter(task => task.priority === priority);
    }

    // Filter by status
    if (status !== 'all') {
      filtered = filtered.filter(
        task => status === 'completed' ? task.completed : !task.completed
      );
    }

    setFilteredTasks(filtered);
  }, [tasks, filters]);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Handle clear all tasks
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all tasks? This action cannot be undone.')) {
      clearTasks();
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      {authSuccess && (
        <Alert severity="success" onClose={clearAuthErrors} sx={{ mt: 2, mb: 2 }}>
          {authSuccess}
        </Alert>
      )}

      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome, {user && user.username}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Manage your tasks efficiently
        </Typography>

        {taskError && (
          <Alert severity="error" onClose={clearTaskErrors} sx={{ mb: 2 }}>
            {taskError}
          </Alert>
        )}

        <Grid container spacing={4}>
          {/* Task Form Section */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <TaskForm />
            </Paper>
          </Grid>

          {/* Task List Section */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <TaskFilter onFilterChange={handleFilterChange} />
                {filteredTasks.length > 0 && (
                  <Tooltip title="Clear All Tasks">
                    <IconButton
                      color="error"
                      onClick={handleClearAll}
                      size="small"
                    >
                      <DeleteSweepIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
              
              <Box sx={{ mt: 2 }}>
                {filteredTasks.length === 0 ? (
                  <Typography variant="body1" align="center" color="text.secondary">
                    No tasks found. Add a new task to get started!
                  </Typography>
                ) : (
                  filteredTasks.map(task => (
                    <TaskItem key={task._id} task={task} />
                  ))
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Tasks;