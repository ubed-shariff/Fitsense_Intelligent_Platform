import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import dietReducer from './dietSlice';
import workoutReducer from './workoutSlice';
import trackerReducer from './trackerSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    diet: dietReducer,
    workout: workoutReducer,
    tracker: trackerReducer,
    user: userReducer,
  },
});