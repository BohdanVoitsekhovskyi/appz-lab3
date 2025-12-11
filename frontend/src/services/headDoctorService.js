import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8081';
const LOG_API_BASE_URL = 'http://localhost:8084';

/**
 * Register a new doctor
 * @param {Object} doctorData - Doctor registration data
 * @returns {Promise<void>}
 */
export const registerDoctor = async (doctorData) => {
  try {
    await axios.post(`${USER_API_BASE_URL}/users/register/doctor`, doctorData);
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Doctor registration failed');
    } else if (error.request) {
      throw new Error('Unable to connect to server. Please check if the backend is running.');
    } else {
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
};

/**
 * Get logs for a specific service
 * @param {string} serviceName - Name of the service
 * @returns {Promise<Array>} List of log entries
 */
export const getLogs = async (serviceName) => {
  try {
    const response = await axios.get(`${LOG_API_BASE_URL}/logs/${serviceName}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Failed to fetch logs');
    } else if (error.request) {
      throw new Error('Unable to connect to server. Please check if the backend is running.');
    } else {
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
};

/**
 * Available service names
 */
export const AVAILABLE_SERVICES = [
  'user-service',
  'patient-service',
  'doctor-service',
  'log-service',
  'notification-service',
  'discovery-service'
];


