import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock the router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }) => <div>{children}</div>
}));

// Mock the auth context
jest.mock('./context/auth/AuthContext', () => ({
  AuthContext: {
    Consumer: ({ children }) => children({ isAuthenticated: false }),
    Provider: ({ children }) => children
  },
  useAuth: () => ({
    isAuthenticated: false,
    loading: false,
    user: null,
    error: null,
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
    clearErrors: jest.fn()
  })
}));

// Mock the task context
jest.mock('./context/task/TaskContext', () => ({
  TaskContext: {
    Consumer: ({ children }) => children({ tasks: [] }),
    Provider: ({ children }) => children
  },
  useTask: () => ({
    tasks: [],
    loading: false,
    error: null,
    getTasks: jest.fn(),
    addTask: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
    clearErrors: jest.fn()
  })
}));

test('renders app without crashing', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});
