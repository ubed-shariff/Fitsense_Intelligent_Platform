import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

export const trackActivity = createAsyncThunk('tracker/track', async (activityData, { getState, rejectWithValue }) => {
  try {
    const { auth } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    };
    const response = await axios.post(`${API_URL}/tracker/track`, activityData, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const trackerSlice = createSlice({
  name: 'tracker',
  initialState: {
    caloriesBurned: 0,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(trackActivity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(trackActivity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.caloriesBurned += action.payload.calories_burned;
      })
      .addCase(trackActivity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default trackerSlice.reducer;