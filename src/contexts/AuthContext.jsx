import { createContext, useContext, useReducer, useEffect } from 'react';
import { googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true
};

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false
      };
    case 'logout':
      return { ...state, user: null, isAuthenticated: false, loading: false };
    default:
      throw new Error('Unknown action');
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, loading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwtDecode(token);
      dispatch({ type: 'login', payload: user });
    }
  }, []);

  function login(credential) {
    const user = jwtDecode(credential);
    localStorage.setItem('token', credential);
    dispatch({ type: 'login', payload: user });
  }

  function logout() {
    localStorage.removeItem('token');
    dispatch({ type: 'logout' });
    googleLogout();
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('AuthContext was used outside AuthProvider');
  return context;
}

export { AuthProvider, useAuth };
