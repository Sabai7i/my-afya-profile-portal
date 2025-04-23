export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'doctor' | 'nurse' | 'staff';
  firstName: string;
  lastName: string;
  specialization?: string;
  licenseNumber?: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  nationalId: string;
  phoneNumber: string;
  email?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
  };
  medicalHistory: Array<{
    condition: string;
    diagnosisDate: string;
    treatment: string;
    status: string;
  }>;
  allergies: Array<{
    name: string;
    severity: string;
    notes: string;
  }>;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate?: string;
  }>;
  emergencyContact?: {
    name: string;
    relationship: string;
    phoneNumber: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  errors?: Array<{
    msg: string;
    param: string;
  }>;
} 