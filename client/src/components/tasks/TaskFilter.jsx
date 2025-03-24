import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Grid,
  Typography
} from '@mui/material';

const TaskFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    priority: 'all',
    status: 'all'
  });

  const { search, priority, status } = filters;

  // Notify parent component when filters change
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const onChange = e => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="subtitle1" gutterBottom>
        Filter Tasks
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="search"
            name="search"
            label="Search Tasks"
            placeholder="Search by title or description"
            value={search}
            onChange={onChange}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel id="priority-filter-label">Priority</InputLabel>
            <Select
              labelId="priority-filter-label"
              id="priority-filter"
              name="priority"
              value={priority}
              onChange={onChange}
              label="Priority"
            >
              <MenuItem value="all">All Priorities</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={3}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              id="status-filter"
              name="status"
              value={status}
              onChange={onChange}
              label="Status"
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="active">Active</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskFilter;