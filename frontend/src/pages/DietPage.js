import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { getDietPlan } from '../store/dietSlice';
import DietPlan from '../components/DietPlan';

const DietPage = () => {
  const dispatch = useDispatch();
  const { plan, status, error } = useSelector((state) => state.diet);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getDietPlan());
    }
  }, [status, dispatch]);

  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Your Diet Plan
      </Typography>
      {status === 'loading' && <CircularProgress />}
      {status === 'failed' && <Alert severity="error">{error.detail}</Alert>}
      {status === 'succeeded' && plan && <DietPlan plan={plan} />}
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(getDietPlan())}
        disabled={status === 'loading'}
        sx={{ mt: 2 }}
      >
        Get New Diet Plan
      </Button>
    </Container>
  );
};

export default DietPage;