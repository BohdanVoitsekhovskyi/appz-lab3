import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081';

/**
 * Authenticate user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} User object with id, email, role, etc.
 */
export const authenticate = async (email, password) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/authenticate`, {
      params: {
        email,
        password
      }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with error status
      throw new Error(error.response.data?.message || 'Authentication failed');
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Unable to connect to server. Please check if the backend is running.');
    } else {
      // Something else happened
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
};

