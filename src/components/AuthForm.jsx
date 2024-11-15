import React, { useState } from 'react';
import axios from 'axios';


const AuthForm = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Toggle between login and registration
  const toggleFormType = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const url = isLogin
      ? 'http://localhost:5000/api/login'
      : 'http://localhost:5000/api/register';

    try {
      const response = await axios.post(url, formData);
      localStorage.setItem('token', response.data.token); 
      onAuthSuccess(); 
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="auth-form mt-5 bg-primary">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required={!isLogin}
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <p onClick={toggleFormType} className="toggle-form-type">
        {isLogin ? "Don't have an account? Register here" : 'Already have an account? Login here'}
      </p>
    </div>
  );
};

export default AuthForm;
