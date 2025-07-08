import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, TextField, Button, Box, CircularProgress, Alert } from '@mui/material';
import { trackActivity } from '../store/trackerSlice';

const TrackerPage = () => {
  const dispatch = useDispatch();
  const { caloriesBurned, status, error } = useSelector((state) => state.tracker);

  const [activityName, setActivityName] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(trackActivity({ name: activityName, duration_minutes: parseInt(duration, 10) }));
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Track Activity
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="activityName"
            label="Activity Name"
            name="activityName"
            autoFocus
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="duration"
            label="Duration (minutes)"
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={status === 'loading'}
          >
            Track
          </Button>
        </Box>
        {status === 'loading' && <CircularProgress />}
        {status === 'failed' && <Alert severity="error">{error.detail}</Alert>}
        <Typography variant="h6" sx={{ mt: 2 }}>
          Total Calories Burned Today: {caloriesBurned.toFixed(2)}
        </Typography>
      </Box>
    </Container>
  );
};

export default TrackerPage;