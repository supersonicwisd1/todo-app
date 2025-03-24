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
  Checkbox
} from '@mui/material';
import TaskContext from '../../context/task/TaskContext';

const TaskForm = () => {
  const { addTask, updateTask, current, clearCurrent } = useContext(TaskContext);

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

  const onSubmit = e => {
    e.preventDefault();
    
    if (current === null) {
      addTask(task);
    } else {
      updateTask(task);
    }
    
    // Clear form after submission
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
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
    </Box>
  );
};

export default TaskForm;