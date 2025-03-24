import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Pages
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Tasks from './pages/Tasks';

// Components
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import PrivateRoute from './PrivateRoute';

// Context Providers
import { AuthProvider } from './context/auth/AuthContext';
import { TaskProvider } from './context/task/TaskContext';

// Set axios base URL
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5001/api';

// Create MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Navbar />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route 
                  path="/tasks" 
                  element={
                    <PrivateRoute component={Tasks} />
                  } 
                />
              </Routes>
            </div>
          </Router>
        </ThemeProvider>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;