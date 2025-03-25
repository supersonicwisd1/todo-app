import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TaskProvider } from '../../../context/task/TaskContext';
import TaskForm from '../TaskForm';

// Mock the TaskContext
jest.mock('../../../context/task/TaskContext', () => ({
  ...jest.requireActual('../../../context/task/TaskContext'),
  TaskContext: jest.requireActual('react').createContext({
    addTask: jest.fn(),
    updateTask: jest.fn(),
    current: null,
    clearCurrent: jest.fn(),
    error: null
  })
}));

describe('TaskForm Component', () => {
  const mockAddTask = jest.fn();
  const mockUpdateTask = jest.fn();
  const mockClearCurrent = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with all fields', () => {
    render(
      <TaskProvider>
        <TaskForm />
      </TaskProvider>
    );

    expect(screen.getByLabelText(/task title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/due date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/completed/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  it('submits the form with correct data', async () => {
    render(
      <TaskProvider>
        <TaskForm />
      </TaskProvider>
    );

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/task title/i), {
      target: { value: 'Test Task' }
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Test Description' }
    });
    fireEvent.change(screen.getByLabelText(/priority/i), {
      target: { value: 'high' }
    });
    fireEvent.change(screen.getByLabelText(/due date/i), {
      target: { value: '2024-12-31' }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    // Check if the form was submitted with correct data
    await waitFor(() => {
      expect(mockAddTask).toHaveBeenCalledWith({
        title: 'Test Task',
        description: 'Test Description',
        priority: 'high',
        dueDate: '2024-12-31',
        completed: false
      });
    });
  });

  it('clears the form after successful submission', async () => {
    render(
      <TaskProvider>
        <TaskForm />
      </TaskProvider>
    );

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/task title/i), {
      target: { value: 'Test Task' }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    // Check if the form was cleared
    await waitFor(() => {
      expect(screen.getByLabelText(/task title/i)).toHaveValue('');
    });
    await waitFor(() => {
      expect(screen.getByLabelText(/description/i)).toHaveValue('');
    });
    await waitFor(() => {
      expect(screen.getByLabelText(/priority/i)).toHaveValue('medium');
    });
    await waitFor(() => {
      expect(screen.getByLabelText(/due date/i)).toHaveValue('');
    });
    await waitFor(() => {
      expect(screen.getByLabelText(/completed/i)).not.toBeChecked();
    });
  });

  it('shows error message when submission fails', async () => {
    const errorMessage = 'Failed to add task';
    mockAddTask.mockRejectedValueOnce(new Error(errorMessage));

    render(
      <TaskProvider>
        <TaskForm />
      </TaskProvider>
    );

    // Fill in and submit the form
    fireEvent.change(screen.getByLabelText(/task title/i), {
      target: { value: 'Test Task' }
    });
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    // Check if error message is displayed
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
}); 