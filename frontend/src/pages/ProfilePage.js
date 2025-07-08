import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, TextField, Button, Box, CircularProgress, Alert } from '@mui/material';
import { getUserProfile, updateUserProfile } from '../store/userSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { profile, status, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    full_name: '',
    age: '',
    weight: '',
    height: '',
    gender: '',
    health_conditions: '',
    dietary_preferences: '',
  });

  useEffect(() => {
    if (!profile) {
      dispatch(getUserProfile());
    } else {
      setFormData({
        full_name: profile.full_name || '',
        age: profile.age || '',
        weight: profile.weight || '',
        height: profile.height || '',
        gender: profile.gender || '',
        health_conditions: profile.health_conditions.join(', '),
        dietary_preferences: profile.dietary_preferences.join(', '),
      });
    }
  }, [profile, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProfile = {
      ...formData,
      health_conditions: formData.health_conditions.split(',').map(s => s.trim()),
      dietary_preferences: formData.dietary_preferences.split(',').map(s => s.trim()),
    };
    dispatch(updateUserProfile(updatedProfile));
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Your Profile
        </Typography>
        {status === 'loading' && <CircularProgress />}
        {status === 'failed' && <Alert severity="error">{error.detail}</Alert>}
        {profile && (
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="full_name"
              label="Full Name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="age"
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="weight"
              label="Weight (kg)"
              name="weight"
              type="number"
              value={formData.weight}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="height"
              label="Height (cm)"
              name="height"
              type="number"
              value={formData.height}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="gender"
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="health_conditions"
              label="Health Conditions (comma-separated)"
              name="health_conditions"
              value={formData.health_conditions}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="dietary_preferences"
              label="Dietary Preferences (comma-separated)"
              name="dietary_preferences"
              value={formData.dietary_preferences}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={status === 'loading'}
            >
              Update Profile
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ProfilePage;