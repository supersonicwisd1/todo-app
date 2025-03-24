import React, { createContext, useReducer, useEffect } from 'react';
import authReducer from './authReducer';
import api from '../../utils/api';

// Create context
export const AuthContext = createContext();

// Initial state
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null,
  success: null
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user on mount
  useEffect(() => {
    const initAuth = async () => {
      if (localStorage.token) {
        try {
          await loadUser();
        } catch (err) {
          dispatch({ type: 'AUTH_ERROR' });
        }
      } else {
        dispatch({ type: 'AUTH_ERROR' });
      }
    };

    initAuth();
  }, []);

  // Load user
  const loadUser = async () => {
    try {
      const res = await api.get('/auth/me');
      
      if (res && res.data && res.data.data) {
        dispatch({
          type: 'USER_LOADED',
          payload: res.data.data
        });
      } else {
        throw new Error('Invalid user data response');
      }
    } catch (err) {
      console.error('AuthContext - Load user error:', err);
      dispatch({ type: 'AUTH_ERROR' });
      throw err;
    }
  };

  // Login user
  const login = async (formData) => {
    try {
      const res = await api.post('/auth/login', formData);

      if (res && res.data) {
        // Store token in localStorage
        localStorage.setItem('token', res.data.token);
        
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: res.data
        });

        await loadUser();
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('AuthContext - Login error:', err);
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.response?.data?.message || 'Login failed. Please try again.'
      });
    }
  };

  // Register user
  const register = async (formData) => {
    try {
      const res = await api.post('/auth/register', formData);

      if (res && res.data) {
        dispatch({
          type: 'REGISTER_SUCCESS',
          payload: res.data
        });

        await loadUser();
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('AuthContext - Registration error:', err);
      dispatch({
        type: 'REGISTER_FAIL',
        payload: err.response?.data?.message || 'Registration failed. Please try again.'
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: 'LOGOUT' });

  // Clear errors
  const clearErrors = () => dispatch({ type: 'CLEAR_ERRORS' });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        success: state.success,
        register,
        login,
        logout,
        loadUser,
        clearErrors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;