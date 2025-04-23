import axios from 'axios';
import { User, Patient, AuthResponse } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (username: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', { username, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  register: async (userData: Partial<User>): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await api.put<User>('/auth/me', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

export const patientService = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get(`/patients?page=${page}&limit=${limit}`);
    return response.data;
  },

  getById: async (id: string): Promise<Patient> => {
    const response = await api.get<Patient>(`/patients/${id}`);
    return response.data;
  },

  create: async (patientData: Partial<Patient>): Promise<Patient> => {
    const response = await api.post<Patient>('/patients', patientData);
    return response.data;
  },

  update: async (id: string, patientData: Partial<Patient>): Promise<Patient> => {
    const response = await api.put<Patient>(`/patients/${id}`, patientData);
    return response.data;
  },

  addMedicalHistory: async (id: string, historyData: any): Promise<Patient> => {
    const response = await api.post<Patient>(`/patients/${id}/medical-history`, historyData);
    return response.data;
  },

  search: async (query: string): Promise<Patient[]> => {
    const response = await api.get<Patient[]>(`/patients/search?query=${query}`);
    return response.data;
  },
};

export default api; 