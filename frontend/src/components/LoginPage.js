import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authenticate } from '../services/authService';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setUser(null);

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const userData = await authenticate(email, password);
      setUser(userData);
      setSuccess(true);
      setError('');
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Redirect to dashboard based on user role
      if (userData.role === 'PATIENT') {
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else if (userData.role === 'HEAD_DOCTOR') {
        setTimeout(() => {
          navigate('/head-doctor-dashboard');
        }, 1000);
      } else if (userData.role === 'DOCTOR') {
        setTimeout(() => {
          navigate('/doctor-dashboard');
        }, 1000);
      } else {
        console.log('Login successful:', userData);
        // Handle other roles here if needed
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.');
      setSuccess(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>
          <p className="head-doctor-hint">Head Doctor: headdoctor@gmail.com / 1</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={loading}
              required
            />
          </div>

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          {success && user && (
            <div className="success-message" role="alert">
              <p>Login successful!</p>
              <p className="user-info">
                Welcome, {user.email} (Role: {user.role})
              </p>
            </div>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="login-footer">
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

