import React from 'react';

const mockTaskContext = {
  tasks: [],
  current: null,
  loading: false,
  error: null,
  addTask: jest.fn(),
  updateTask: jest.fn(),
  deleteTask: jest.fn(),
  getTasks: jest.fn(),
  setCurrent: jest.fn(),
  clearCurrent: jest.fn(),
  clearTasks: jest.fn(),
  clearErrors: jest.fn()
};

export const TaskContext = React.createContext(mockTaskContext);

export const TaskProvider = ({ children }) => (
  <TaskContext.Provider value={mockTaskContext}>
    {children}
  </TaskContext.Provider>
); 