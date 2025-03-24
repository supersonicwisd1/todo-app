import React, { useContext } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Box,
  Checkbox,
  Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TaskContext from '../../context/task/TaskContext';

const TaskItem = ({ task }) => {
  const { deleteTask, setCurrent, updateTask } = useContext(TaskContext);
  const { _id, title, description, priority, dueDate, completed } = task;

  const onDelete = () => {
    deleteTask(_id);
  };

  const onEdit = () => {
    setCurrent(task);
  };

  const onToggleComplete = () => {
    updateTask({
      ...task,
      completed: !completed
    });
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return 'No due date';
    const d = new Date(date);
    return d.toLocaleDateString();
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Card 
      sx={{ 
        mb: 2, 
        borderLeft: 5, 
        borderColor: getPriorityColor(priority) + '.main',
        opacity: completed ? 0.7 : 1
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box display="flex" alignItems="center">
            <Tooltip title={completed ? "Mark as incomplete" : "Mark as complete"}>
              <Checkbox
                checked={completed}
                onChange={onToggleComplete}
                color="primary"
              />
            </Tooltip>
            <Box>
              <Typography 
                variant="h6" 
                component="h3"
                sx={{ 
                  textDecoration: completed ? 'line-through' : 'none',
                  color: completed ? 'text.secondary' : 'text.primary'
                }}
              >
                {title}
              </Typography>
              {description && (
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    textDecoration: completed ? 'line-through' : 'none',
                    mt: 1
                  }}
                >
                  {description}
                </Typography>
              )}
            </Box>
          </Box>
          <Box>
            <Tooltip title="Edit">
              <IconButton onClick={onEdit} size="small">
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={onDelete} size="small" color="error">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Box display="flex" mt={2} alignItems="center">
          <Chip 
            label={`Priority: ${priority.charAt(0).toUpperCase() + priority.slice(1)}`}
            color={getPriorityColor(priority)}
            size="small"
            sx={{ mr: 1 }}
          />
          {dueDate && (
            <Chip 
              label={`Due: ${formatDate(dueDate)}`}
              variant="outlined"
              size="small"
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskItem;