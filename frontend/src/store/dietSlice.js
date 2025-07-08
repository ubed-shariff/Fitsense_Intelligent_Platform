import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

export const getDietPlan = createAsyncThunk('diet/getPlan', async (_, { getState, rejectWithValue }) => {
  try {
    const { auth } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    };
    const response = await axios.get(`${API_URL}/diet/plan`, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const dietSlice = createSlice({
  name: 'diet',
  initialState: {
    plan: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDietPlan.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDietPlan.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.plan = action.payload;
      })
      .addCase(getDietPlan.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default dietSlice.reducer;