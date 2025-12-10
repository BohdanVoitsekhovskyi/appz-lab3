import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8081';
const PATIENT_API_BASE_URL = 'http://localhost:8082';
const DOCTOR_API_BASE_URL = 'http://localhost:8085';

/**
 * Register a new patient
 * @param {Object} patientData - Patient registration data
 * @returns {Promise<void>}
 */
export const registerPatient = async (patientData) => {
  try {
    await axios.post(`${USER_API_BASE_URL}/users/register/patient`, patientData);
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Registration failed');
    } else if (error.request) {
      throw new Error('Unable to connect to server. Please check if the backend is running.');
    } else {
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
};

/**
 * Get all appointments for a patient
 * @param {number} patientId - Patient ID
 * @returns {Promise<Array>} List of appointments
 */
export const getPatientAppointments = async (patientId) => {
  try {
    const response = await axios.get(`${PATIENT_API_BASE_URL}/patients/${patientId}/appointments`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Failed to fetch appointments');
    } else if (error.request) {
      throw new Error('Unable to connect to server. Please check if the backend is running.');
    } else {
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
};

/**
 * Get appointment by ID
 * @param {number} appointmentId - Appointment ID
 * @returns {Promise<Object>} Appointment object
 */
export const getAppointmentById = async (appointmentId) => {
  try {
    const response = await axios.get(`${PATIENT_API_BASE_URL}/appointments/${appointmentId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Failed to fetch appointment');
    } else if (error.request) {
      throw new Error('Unable to connect to server. Please check if the backend is running.');
    } else {
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
};

/**
 * Get all doctors
 * @returns {Promise<Array>} List of doctors
 */
export const getAllDoctors = async () => {
  try {
    const response = await axios.get(`${DOCTOR_API_BASE_URL}/doctors`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Failed to fetch doctors');
    } else if (error.request) {
      throw new Error('Unable to connect to server. Please check if the backend is running.');
    } else {
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
};

/**
 * Get doctor by ID
 * @param {number} userId - Doctor user ID
 * @returns {Promise<Object>} Doctor object
 */
export const getDoctorById = async (userId) => {
  try {
    const response = await axios.get(`${DOCTOR_API_BASE_URL}/doctors/${userId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Failed to fetch doctor');
    } else if (error.request) {
      throw new Error('Unable to connect to server. Please check if the backend is running.');
    } else {
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
};

/**
 * Create a new appointment
 * @param {Object} appointmentData - Appointment data
 * @returns {Promise<void>}
 */
export const createAppointment = async (appointmentData) => {
  try {
    await axios.post(`${PATIENT_API_BASE_URL}/appointments`, appointmentData);
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Failed to create appointment');
    } else if (error.request) {
      throw new Error('Unable to connect to server. Please check if the backend is running.');
    } else {
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
};

/**
 * Get appointments by doctor and date
 * @param {number} doctorId - Doctor ID
 * @param {string} date - Date in YYYY-MM-DD format
 * @returns {Promise<Array>} List of appointments
 */
export const getAppointmentsByDoctorAndDate = async (doctorId, date) => {
  try {
    const response = await axios.get(`${PATIENT_API_BASE_URL}/appointments/doctor/${doctorId}/date/${date}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Failed to fetch appointments');
    } else if (error.request) {
      throw new Error('Unable to connect to server. Please check if the backend is running.');
    } else {
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
};

/**
 * Get all appointments for a doctor
 * @param {number} doctorId - Doctor ID
 * @returns {Promise<Array>} List of appointments
 */
export const getDoctorAppointments = async (doctorId) => {
  try {
    const response = await axios.get(`${PATIENT_API_BASE_URL}/appointments/doctor/${doctorId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Failed to fetch appointments');
    } else if (error.request) {
      throw new Error('Unable to connect to server. Please check if the backend is running.');
    } else {
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
};

