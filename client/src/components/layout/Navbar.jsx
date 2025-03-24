import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AuthContext from '../../context/auth/AuthContext';
import TaskContext from '../../context/task/TaskContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { clearTasks } = useContext(TaskContext);

  const onLogout = () => {
    logout();
    clearTasks();
  };

  const authLinks = (
    <>
      <Typography variant="body1" component="div" sx={{ flexGrow: 0, mr: 2 }}>
        {user && `Hello ${user.username}`}
      </Typography>
      <Button color="inherit" component={Link} to="/tasks">
        My Tasks
      </Button>
      <Button color="inherit" onClick={onLogout}>
        Logout
      </Button>
    </>
  );

  const guestLinks = (
    <>
      <Button color="inherit" component={Link} to="/register">
        Register
      </Button>
      <Button color="inherit" component={Link} to="/login">
        Login
      </Button>
    </>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              Task Manager
            </Link>
          </Typography>
          {isAuthenticated ? authLinks : guestLinks}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;