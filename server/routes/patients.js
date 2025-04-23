const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Patient = require('../models/Patient');
const { auth, checkRole } = require('../middleware/auth');

// Get all patients (with pagination)
router.get('/', auth, checkRole(['admin', 'doctor', 'nurse']), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const patients = await Patient.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Patient.countDocuments();

    res.json({
      patients,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPatients: total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error: error.message });
  }
});

// Get single patient
router.get('/:id', auth, checkRole(['admin', 'doctor', 'nurse']), async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient', error: error.message });
  }
});

// Create new patient
router.post('/', auth, checkRole(['admin', 'doctor']), [
  check('firstName').notEmpty().withMessage('First name is required'),
  check('lastName').notEmpty().withMessage('Last name is required'),
  check('dateOfBirth').isISO8601().withMessage('Valid date of birth is required'),
  check('gender').isIn(['Male', 'Female', 'Other']).withMessage('Valid gender is required'),
  check('nationalId').notEmpty().withMessage('National ID is required'),
  check('phoneNumber').notEmpty().withMessage('Phone number is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error creating patient', error: error.message });
  }
});

// Update patient
router.put('/:id', auth, checkRole(['admin', 'doctor']), async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error updating patient', error: error.message });
  }
});

// Add medical history
router.post('/:id/medical-history', auth, checkRole(['admin', 'doctor']), [
  check('condition').notEmpty().withMessage('Condition is required'),
  check('diagnosisDate').isISO8601().withMessage('Valid diagnosis date is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    patient.medicalHistory.push(req.body);
    await patient.save();
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error adding medical history', error: error.message });
  }
});

// Search patients
router.get('/search', auth, checkRole(['admin', 'doctor', 'nurse']), async (req, res) => {
  try {
    const { query } = req.query;
    const patients = await Patient.find({
      $or: [
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } },
        { nationalId: { $regex: query, $options: 'i' } }
      ]
    }).limit(10);

    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error searching patients', error: error.message });
  }
});

module.exports = router; 