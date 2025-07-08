import React from 'react';
import { Container, Typography } from '@mui/material';

const HomePage = () => {
  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to FitGenie
      </Typography>
      <Typography variant="body1">
        Your personal AI-powered fitness and diet planner.
      </Typography>
    </Container>
  );
};

export default HomePage;