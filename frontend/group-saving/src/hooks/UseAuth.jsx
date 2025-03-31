import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useAuthForm = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // Validate inputs
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Attempt login
      await login(email, password);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (name, email, password, confirmPassword) => {
    setLoading(true);
    setError(null);

    try {
      // Input validations
      if (!name || !email || !password) {
        throw new Error('All fields are required');
      }

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      // Attempt signup
      await signup(name, email, password);
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLogin,
    handleSignup,
    error,
    loading
  };
};