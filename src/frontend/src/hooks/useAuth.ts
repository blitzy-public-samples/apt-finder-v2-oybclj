import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser, registerUser, setError, clearError } from '../store/slices/authSlice';
import { RootState } from '../store';
import { User } from '../types/auth';
import { login, logout, register, getCurrentUser } from '../services/auth';

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const user = await login(email, password);
      dispatch(loginUser(user));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const handleLogout = useCallback(async () => {
    setLoading(true);
    try {
      await logout();
      dispatch(logoutUser());
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const handleRegister = useCallback(async (user: Omit<User, 'id'>) => {
    setLoading(true);
    try {
      const newUser = await register(user);
      dispatch(registerUser(newUser));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const user = await getCurrentUser();
      if (user) {
        dispatch(loginUser(user));
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    error: auth.error,
    loading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    clearError: () => dispatch(clearError()),
  };
};

// Human tasks:
// 1. Implement proper error handling and user feedback for authentication actions (Required)
// 2. Add support for token refresh mechanism (Required)
// 3. Implement remember me functionality for persistent login (Optional)