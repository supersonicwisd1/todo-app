import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import AuthContext from './context/auth/AuthContext';

const PrivateRoute = ({ component: Component }) => {
  const { isAuthenticated, loading, user } = useContext(AuthContext);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isAuthenticated && user) {
    return <Component />;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;