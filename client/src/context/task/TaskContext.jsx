import React, { createContext, useReducer } from 'react';
import api from '../../utils/api';
import taskReducer from './taskReducer';

// Create context
export const TaskContext = createContext();

// Provider component
export const TaskProvider = ({ children }) => {
  const initialState = {
    tasks: [],
    current: null,
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Get tasks
  const getTasks = async () => {
    try {
      const res = await api.get('/tasks');

      if (res && res.data && res.data.data) {
        dispatch({
          type: 'GET_TASKS',
          payload: res.data.data
        });
      } else {
        throw new Error('Invalid task data response');
      }
    } catch (err) {
      console.error('Get tasks error:', err);
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response?.data?.message || 'Failed to fetch tasks'
      });
    }
  };

  // Add task
  const addTask = async (task) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await api.post('/tasks', task, config);

      if (res && res.data && res.data.data) {
        dispatch({
          type: 'ADD_TASK',
          payload: res.data.data
        });
      } else {
        throw new Error('Invalid add task response');
      }
    } catch (err) {
      console.error('Add task error:', err);
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response?.data?.message || 'Failed to add task'
      });
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);

      dispatch({
        type: 'DELETE_TASK',
        payload: id
      });
    } catch (err) {
      console.error('Delete task error:', err);
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response?.data?.message || 'Failed to delete task'
      });
    }
  };

  // Update task
  const updateTask = async (task) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await api.put(`/tasks/${task._id}`, task, config);

      if (res && res.data && res.data.data) {
        dispatch({
          type: 'UPDATE_TASK',
          payload: res.data.data
        });
      } else {
        throw new Error('Invalid update task response');
      }
    } catch (err) {
      console.error('Update task error:', err);
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response?.data?.message || 'Failed to update task'
      });
    }
  };

  // Set current task (for editing)
  const setCurrent = (task) => {
    dispatch({
      type: 'SET_CURRENT',
      payload: task
    });
  };

  // Clear current task
  const clearCurrent = () => {
    dispatch({ type: 'CLEAR_CURRENT' });
  };

  // Clear tasks (for logout)
  const clearTasks = () => {
    dispatch({ type: 'CLEAR_TASKS' });
  };

  // Clear errors
  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        current: state.current,
        loading: state.loading,
        error: state.error,
        getTasks,
        addTask,
        deleteTask,
        updateTask,
        setCurrent,
        clearCurrent,
        clearTasks,
        clearErrors
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;