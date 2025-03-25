import React, { useState, useContext, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select,
  MenuItem,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  Alert,
  Snackbar
} from '@mui/material';
import TaskContext from '../../context/task/TaskContext';

const TaskForm = () => {
  const { addTask, updateTask, current, clearCurrent, error: taskError } = useContext(TaskContext);
  const [success, setSuccess] = useState(false);
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    completed: false
  });

  // Load current task into form if in edit mode
  useEffect(() => {
    if (current !== null) {
      setTask({
        ...current,
        dueDate: current.dueDate ? current.dueDate.substring(0, 10) : ''
      });
    } else {
      setTask({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        completed: false
      });
    }
  }, [current]);

  const { title, description, priority, dueDate, completed } = task;

  const onChange = e => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setTask({ ...task, [e.target.name]: value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setSuccess(false);
    
    try {
      if (current === null) {
        await addTask(task);
        setSuccess(true);
      } else {
        await updateTask(task);
        setSuccess(true);
      }
      
      // Clear form after successful submission
      clearAll();
    } catch (error) {
      console.error('Task submission error:', error);
    }
  };

  const clearAll = () => {
    clearCurrent();
    setTask({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      completed: false
    });
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        {current ? 'Edit Task' : 'Add Task'}
      </Typography>
      <Box component="form" onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="title"
              label="Task Title"
              name="title"
              value={title}
              onChange={onChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="description"
              label="Description"
              name="description"
              value={description}
              onChange={onChange}
              multiline
              rows={3}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="priority-label">Priority</InputLabel>
              <Select
                labelId="priority-label"
                id="priority"
                name="priority"
                value={priority}
                onChange={onChange}
                label="Priority"
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="dueDate"
              label="Due Date"
              name="dueDate"
              type="date"
              value={dueDate}
              onChange={onChange}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={completed}
                  onChange={onChange}
                  name="completed"
                  color="primary"
                />
              }
              label="Completed"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              {current ? 'Update Task' : 'Add Task'}
            </Button>
          </Grid>
          {current && (
            <Grid item xs={12}>
              <Button
                onClick={clearAll}
                variant="outlined"
                color="secondary"
                fullWidth
              >
                Cancel
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>

      {/* Success Alert */}
      <Snackbar 
        open={success} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          {current ? 'Task updated successfully!' : 'Task added successfully!'}
        </Alert>
      </Snackbar>

      {/* Error Alert */}
      {taskError && (
        <Snackbar 
          open={!!taskError} 
          autoHideDuration={3000} 
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity="error" 
            sx={{ width: '100%' }}
          >
            {taskError}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default TaskForm;