import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Grid,
  MenuItem,
  Typography,
  Paper,
} from '@mui/material';
import { Patient } from '../types';

interface PatientFormProps {
  initialValues?: Partial<Patient>;
  onSubmit: (values: Partial<Patient>) => Promise<void>;
  isEditing?: boolean;
}

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  dateOfBirth: Yup.date().required('Date of birth is required'),
  gender: Yup.string()
    .oneOf(['Male', 'Female', 'Other'], 'Invalid gender')
    .required('Gender is required'),
  nationalId: Yup.string().required('National ID is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  email: Yup.string().email('Invalid email address'),
});

const PatientForm: React.FC<PatientFormProps> = ({
  initialValues = {},
  onSubmit,
  isEditing = false,
}) => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      nationalId: '',
      phoneNumber: '',
      email: '',
      address: {
        street: '',
        city: '',
        state: '',
        postalCode: '',
      },
      emergencyContact: {
        name: '',
        relationship: '',
        phoneNumber: '',
      },
      ...initialValues,
    },
    validationSchema,
    onSubmit: async (values) => {
      await onSubmit(values);
    },
  });

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {isEditing ? 'Edit Patient' : 'Add New Patient'}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="dateOfBirth"
              name="dateOfBirth"
              label="Date of Birth"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
              helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="gender"
              name="gender"
              select
              label="Gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              error={formik.touched.gender && Boolean(formik.errors.gender)}
              helperText={formik.touched.gender && formik.errors.gender}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="nationalId"
              name="nationalId"
              label="National ID"
              value={formik.values.nationalId}
              onChange={formik.handleChange}
              error={formik.touched.nationalId && Boolean(formik.errors.nationalId)}
              helperText={formik.touched.nationalId && formik.errors.nationalId}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
              helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Address
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="address.street"
              name="address.street"
              label="Street"
              value={formik.values.address?.street}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="address.city"
              name="address.city"
              label="City"
              value={formik.values.address?.city}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="address.state"
              name="address.state"
              label="State"
              value={formik.values.address?.state}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="address.postalCode"
              name="address.postalCode"
              label="Postal Code"
              value={formik.values.address?.postalCode}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Emergency Contact
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="emergencyContact.name"
              name="emergencyContact.name"
              label="Name"
              value={formik.values.emergencyContact?.name}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="emergencyContact.relationship"
              name="emergencyContact.relationship"
              label="Relationship"
              value={formik.values.emergencyContact?.relationship}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="emergencyContact.phoneNumber"
              name="emergencyContact.phoneNumber"
              label="Phone Number"
              value={formik.values.emergencyContact?.phoneNumber}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" onClick={() => formik.resetForm()}>
                Reset
              </Button>
              <Button variant="contained" type="submit">
                {isEditing ? 'Update Patient' : 'Add Patient'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default PatientForm; 