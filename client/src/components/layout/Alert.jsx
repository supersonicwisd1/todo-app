import React, { useContext } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AuthContext from '../../context/auth/AuthContext';
import TaskContext from '../../context/task/TaskContext';

const AlertComponent = () => {
  const { error: authError, success: authSuccess, clearErrors: clearAuthErrors } = useContext(AuthContext);
  const { error: taskError, success: taskSuccess, clearErrors: clearTaskErrors } = useContext(TaskContext);

  const handleClose = () => {
    if (authError) clearAuthErrors();
    if (taskError) clearTaskErrors();
  };

  return (
    <Stack sx={{ width: '100%', mt: 2 }} spacing={2}>
      {authError && (
        <Alert severity="error" onClose={handleClose}>
          {authError}
        </Alert>
      )}
      {authSuccess && (
        <Alert severity="success" onClose={handleClose}>
          {authSuccess}
        </Alert>
      )}
      {taskError && (
        <Alert severity="error" onClose={handleClose}>
          {taskError}
        </Alert>
      )}
      {taskSuccess && (
        <Alert severity="success" onClose={handleClose}>
          {taskSuccess}
        </Alert>
      )}
    </Stack>
  );
};

export default AlertComponent;