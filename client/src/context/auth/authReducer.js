const authReducer = (state, action) => {

  switch (action.type) {
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        error: null
      };
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false,
        error: null,
        success: action.type === 'LOGIN_SUCCESS' ? 'Successfully logged in!' : 'Registration successful!'
      };
    case 'REGISTER_FAIL':
    case 'LOGIN_FAIL':
    case 'AUTH_ERROR':
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
        success: null
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null,
        success: null
      };
    default:
      return state;
  }
};

export default authReducer;