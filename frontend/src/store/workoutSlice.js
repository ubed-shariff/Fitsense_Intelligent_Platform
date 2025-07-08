import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

export const getWorkoutPlan = createAsyncThunk('workout/getPlan', async (_, { getState, rejectWithValue }) => {
  try {
    const { auth } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    };
    const response = await axios.get(`${API_URL}/workout/plan`, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const workoutSlice = createSlice({
  name: 'workout',
  initialState: {
    plan: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWorkoutPlan.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getWorkoutPlan.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.plan = action.payload;
      })
      .addCase(getWorkoutPlan.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default workoutSlice.reducer;