import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../TaskForm';
import { TaskContext } from '../../../context/task/TaskContext';

// Mock the API module
jest.mock('../../../utils/api', () => ({
  interceptors: {
    request: {
      use: jest.fn(),
      eject: jest.fn()
    },
    response: {
      use: jest.fn(),
      eject: jest.fn()
    }
  },
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
}));

// Create a mock context value
const mockTaskContext = {
  addTask: jest.fn(),
  updateTask: jest.fn(),
  current: null,
  clearCurrent: jest.fn(),
  error: null
};

// Create a wrapper component that provides the context
const TaskContextWrapper = ({ children }) => (
  <TaskContext.Provider value={mockTaskContext}>
    {children}
  </TaskContext.Provider>
);

describe('TaskForm Component', () => {
  it('renders the form with all fields', () => {
    render(
      <TaskContextWrapper>
        <TaskForm />
      </TaskContextWrapper>
    );

    expect(screen.getByLabelText(/task title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/due date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/completed/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  it('allows user to input task details', () => {
    render(
      <TaskContextWrapper>
        <TaskForm />
      </TaskContextWrapper>
    );

    // Fill in the form
    const titleInput = screen.getByLabelText(/task title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const prioritySelect = screen.getByLabelText(/priority/i);
    const dueDateInput = screen.getByLabelText(/due date/i);

    // Regular inputs
    fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    
    // For Material-UI Select
    fireEvent.mouseDown(prioritySelect);
    const highOption = screen.getByRole('option', { name: /high/i });
    fireEvent.click(highOption);
    
    fireEvent.change(dueDateInput, { target: { value: '2024-12-31' } });

    // Verify the values
    expect(titleInput).toHaveValue('Test Task');
    expect(descriptionInput).toHaveValue('Test Description');
    expect(prioritySelect).toHaveTextContent(/high/i);
    expect(dueDateInput).toHaveValue('2024-12-31');
  });
}); 