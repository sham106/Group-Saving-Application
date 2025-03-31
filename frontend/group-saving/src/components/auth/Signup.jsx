import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthForm } from '../../hooks/UseAuth';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false
  });

  const navigate = useNavigate();
  const { handleSignup, error, loading } = useAuthForm();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      setPasswordStrength({
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await handleSignup(
        formData.name, 
        formData.email, 
        formData.password, 
        formData.confirmPassword
      );
      
      // Navigate to dashboard after successful signup
      navigate('/dashboard');
    } catch (err) {
      console.error('Signup failed', err);
    }
  };

  const isPasswordValid = () => {
    return Object.values(passwordStrength).every(Boolean) && 
           formData.password === formData.confirmPassword;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4"
    >
      <div className="bg-white shadow-2xl rounded-2xl max-w-md w-full p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-800">Create Your Account</h2>
          <p className="text-gray-500 mt-2">Join our Group Savings Community</p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded relative" role="alert">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input 
              type="text" 
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your full name"
              required
              disabled={loading}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="you@example.com"
              required
              disabled={loading}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input 
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Create a strong password"
              required
              disabled={loading}
            />
            <div className="mt-2 space-y-1">
              <div className="flex items-center">
                {passwordStrength.length ? <CheckCircle2 className="text-green-500 mr-2" size={16} /> : <XCircle className="text-red-500 mr-2" size={16} />}
                <span className={`text-sm ${passwordStrength.length ? 'text-green-600' : 'text-red-600'}`}>
                  At least 8 characters
                </span>
              </div>
              <div className="flex items-center">
                {passwordStrength.uppercase ? <CheckCircle2 className="text-green-500 mr-2" size={16} /> : <XCircle className="text-red-500 mr-2" size={16} />}
                <span className={`text-sm ${passwordStrength.uppercase ? 'text-green-600' : 'text-red-600'}`}>
                  One uppercase letter
                </span>
              </div>
              <div className="flex items-center">
                {passwordStrength.lowercase ? <CheckCircle2 className="text-green-500 mr-2" size={16} /> : <XCircle className="text-red-500 mr-2" size={16} />}
                <span className={`text-sm ${passwordStrength.lowercase ? 'text-green-600' : 'text-red-600'}`}>
                  One lowercase letter
                </span>
              </div>
              <div className="flex items-center">
                {passwordStrength.number ? <CheckCircle2 className="text-green-500 mr-2" size={16} /> : <XCircle className="text-red-500 mr-2" size={16} />}
                <span className={`text-sm ${passwordStrength.number ? 'text-green-600' : 'text-red-600'}`}>
                  One number
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input 
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Confirm your password"
              required
              disabled={loading}
            />
          </div>
          
          <motion.button
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            type="submit"
            disabled={loading || !isPasswordValid()}
            className={`w-full py-2 rounded-md transition-colors ${
              loading 
                ? 'bg-gray-300 cursor-not-allowed' 
                : isPasswordValid()
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </motion.button>
        </form>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account? {' '}
            <a href="/login" className="font-medium text-green-600 hover:text-green-500">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Signup;