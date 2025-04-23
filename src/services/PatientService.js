import axios from 'axios';

const API_URL = 'http://localhost:5000/api/patients';

// Get token from localStorage
const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.token;
};

// Create axios instance with default headers
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const PatientService = {
  // Get all patients
  getAllPatients: async (page = 1, limit = 10) => {
    try {
      const response = await api.get(`/?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching patients' };
    }
  },

  // Get single patient
  getPatient: async (id) => {
    try {
      const response = await api.get(`/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching patient' };
    }
  },

  // Create new patient
  createPatient: async (patientData) => {
    try {
      const response = await api.post('/', patientData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error creating patient' };
    }
  },

  // Update patient
  updatePatient: async (id, patientData) => {
    try {
      const response = await api.put(`/${id}`, patientData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error updating patient' };
    }
  },

  // Delete patient
  deletePatient: async (id) => {
    try {
      const response = await api.delete(`/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error deleting patient' };
    }
  }
};

export default PatientService; 