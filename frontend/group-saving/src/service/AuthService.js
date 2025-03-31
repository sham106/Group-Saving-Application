import api from './api';

const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', {
      username: userData.username,
      email: userData.email,
      password: userData.password
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.errors || 
          { general: error.response?.data?.error || 'Registration failed' };
  }
};

const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', {
      email: credentials.email,
      password: credentials.password
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.errors || 
          { general: error.response?.data?.error || 'Login failed' };
  }
};

const getProfile = async () => {
  try {
    const response = await api.get('/auth/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to fetch profile';
  }
};

const updateProfile = async (profileData) => {
  try {
    const response = await api.put('/auth/profile', profileData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.errors || 
          { general: error.response?.data?.error || 'Profile update failed' };
  }
};

export default {
  register,
  login,
  getProfile,
  updateProfile
};