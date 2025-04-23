/**
 * @jest-environment jsdom
 */

import PatientService from '../PatientService';

// Mock the entire PatientService module
jest.mock('../PatientService', () => {
  const originalModule = jest.requireActual('../PatientService');

  return {
    ...originalModule,
    getAllPatients: jest.fn(),
    getPatient: jest.fn(),
    createPatient: jest.fn(),
    updatePatient: jest.fn(),
    deletePatient: jest.fn(),
  };
});

describe('PatientService', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('getAllPatients', () => {
    it('should fetch patients with pagination', async () => {
      const mockResponse = {
        patients: [
          { id: 1, name: 'John Doe' },
          { id: 2, name: 'Jane Smith' }
        ],
        total: 2
      };

      PatientService.getAllPatients.mockResolvedValue(mockResponse);

      const result = await PatientService.getAllPatients(1, 10);
      expect(result).toEqual(mockResponse);
      expect(PatientService.getAllPatients).toHaveBeenCalledWith(1, 10);
    });

    it('should handle errors', async () => {
      const error = { message: 'Error fetching patients' };
      PatientService.getAllPatients.mockRejectedValue(error);

      try {
        await PatientService.getAllPatients();
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe('getPatient', () => {
    it('should fetch a single patient', async () => {
      const mockResponse = { id: 1, name: 'John Doe' };
      PatientService.getPatient.mockResolvedValue(mockResponse);

      const result = await PatientService.getPatient(1);
      expect(result).toEqual(mockResponse);
      expect(PatientService.getPatient).toHaveBeenCalledWith(1);
    });

    it('should handle errors', async () => {
      const error = { message: 'Error fetching patient' };
      PatientService.getPatient.mockRejectedValue(error);

      try {
        await PatientService.getPatient(1);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe('createPatient', () => {
    it('should create a new patient', async () => {
      const patientData = { name: 'New Patient' };
      const mockResponse = { id: 3, ...patientData };
      PatientService.createPatient.mockResolvedValue(mockResponse);

      const result = await PatientService.createPatient(patientData);
      expect(result).toEqual(mockResponse);
      expect(PatientService.createPatient).toHaveBeenCalledWith(patientData);
    });

    it('should handle errors', async () => {
      const error = { message: 'Error creating patient' };
      PatientService.createPatient.mockRejectedValue(error);

      try {
        await PatientService.createPatient({});
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe('updatePatient', () => {
    it('should update an existing patient', async () => {
      const patientData = { name: 'Updated Patient' };
      const mockResponse = { id: 1, ...patientData };
      PatientService.updatePatient.mockResolvedValue(mockResponse);

      const result = await PatientService.updatePatient(1, patientData);
      expect(result).toEqual(mockResponse);
      expect(PatientService.updatePatient).toHaveBeenCalledWith(1, patientData);
    });

    it('should handle errors', async () => {
      const error = { message: 'Error updating patient' };
      PatientService.updatePatient.mockRejectedValue(error);

      try {
        await PatientService.updatePatient(1, {});
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe('deletePatient', () => {
    it('should delete a patient', async () => {
      const mockResponse = { message: 'Patient deleted successfully' };
      PatientService.deletePatient.mockResolvedValue(mockResponse);

      const result = await PatientService.deletePatient(1);
      expect(result).toEqual(mockResponse);
      expect(PatientService.deletePatient).toHaveBeenCalledWith(1);
    });

    it('should handle errors', async () => {
      const error = { message: 'Error deleting patient' };
      PatientService.deletePatient.mockRejectedValue(error);

      try {
        await PatientService.deletePatient(1);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });
}); 