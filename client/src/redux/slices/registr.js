import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserData = createAsyncThunk(
  'regist/fetchUserData',
  async params => {
    try {
      const { data } = await axios.post('/api/customers', params, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return data;
    } catch (error) {
      return error;
    }
  },
);

const initialState = {
  data: null,
  status: 'loading',
};

const registSlice = createSlice({
  name: 'regist',
  initialState,
  extraReducers: {
    [fetchUserData.pending]: state => {
      const newState = {
        ...state,
        status: 'loading',
        data: null,
      };
      return newState;
    },
    [fetchUserData.fulfilled]: (state, action) => {
      const newState = {
        ...state,
        status: 'loaded',
        data: [action.payload],
      };
      return newState;
    },
    [fetchUserData.rejected]: state => {
      const newState = {
        ...state,
        status: 'error',
        data: null,
      };
      return newState;
    },
  },
});

export const registReducer = registSlice.reducer;
