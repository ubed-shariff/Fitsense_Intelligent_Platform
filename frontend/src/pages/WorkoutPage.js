import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { getWorkoutPlan } from '../store/workoutSlice';
import WorkoutPlan from '../components/WorkoutPlan';

const WorkoutPage = () => {
  const dispatch = useDispatch();
  const { plan, status, error } = useSelector((state) => state.workout);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getWorkoutPlan());
    }
  }, [status, dispatch]);

  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Your Workout Plan
      </Typography>
      {status === 'loading' && <CircularProgress />}
      {status === 'failed' && <Alert severity="error">{error.detail}</Alert>}
      {status === 'succeeded' && plan && <WorkoutPlan plan={plan} />}
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(getWorkoutPlan())}
        disabled={status === 'loading'}
        sx={{ mt: 2 }}
      >
        Get New Workout Plan
      </Button>
    </Container>
  );
};

export default WorkoutPage;