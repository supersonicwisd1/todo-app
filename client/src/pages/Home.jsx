import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import AuthContext from '../context/auth/AuthContext';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/tasks');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Task Manager
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom align="center">
            Keep track of your daily tasks effectively
          </Typography>
          <Typography variant="body1" paragraph align="center">
            Task Manager helps you organize your tasks, set priorities, and keep track of
            your progress. Simplify your workflow and boost your productivity.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ mx: 1 }}
              onClick={() => navigate('/register')}
            >
              Sign Up
            </Button>
            <Button 
              variant="outlined" 
              color="primary" 
              sx={{ mx: 1 }}
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;