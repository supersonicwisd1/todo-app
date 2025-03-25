import { render, screen } from '@testing-library/react';
import App from './App';
import { AuthContext } from './context/auth/AuthContext';
import { TaskContext } from './context/task/TaskContext';

// Mock react-router-dom components
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' })
}));

// Mock the API module
jest.mock('./utils/api', () => ({
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

// Create mock context values
const mockAuthContext = {
  isAuthenticated: false,
  user: null,
  login: jest.fn(),
  logout: jest.fn()
};

const mockTaskContext = {
  tasks: [],
  current: null,
  loading: false,
  error: null,
  addTask: jest.fn(),
  updateTask: jest.fn(),
  deleteTask: jest.fn(),
  setCurrent: jest.fn(),
  clearCurrent: jest.fn(),
  clearTasks: jest.fn(),
  clearErrors: jest.fn()
};

// Create wrapper components
const AuthContextWrapper = ({ children }) => (
  <AuthContext.Provider value={mockAuthContext}>
    {children}
  </AuthContext.Provider>
);

const TaskContextWrapper = ({ children }) => (
  <TaskContext.Provider value={mockTaskContext}>
    {children}
  </TaskContext.Provider>
);

// Mock the theme provider and CssBaseline
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  ThemeProvider: ({ children }) => children,
  CssBaseline: () => null
}));

test('renders app without crashing', () => {
  render(
    <AuthContextWrapper>
      <TaskContextWrapper>
        <App />
      </TaskContextWrapper>
    </AuthContextWrapper>
  );
  
  // Test for the main heading
  expect(screen.getByRole('heading', { name: 'Task Manager', level: 1 })).toBeInTheDocument();
});
