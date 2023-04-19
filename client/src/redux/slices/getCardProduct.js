import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCardProduct = createAsyncThunk(
  'getCardProduct/fetchCardProduct',
  async params => {
    try {
      const { data } = await axios.get(`/api/products/${params}`);
      console.log('CardProduct>>>>>', data);
      return data;
    } catch (error) {
      console.warn(error);
    }
  },
);

const initialState = {
  product: null,
  status: 'loading',
};

export const getCardProduct = createSlice({
  name: 'getCardProduct',
  initialState,
  extraReducers: {
    [fetchCardProduct.pending]: state => {
      const newState = {
        ...state,
        status: 'loading',
        product: null,
      };
      return newState;
    },
    [fetchCardProduct.fulfilled]: (state, action) => {
      const newState = {
        ...state,
        status: 'loaded',
        product: [action.payload],
      };
      return newState;
    },
    [fetchCardProduct.rejected]: state => {
      const newState = {
        ...state,
        status: 'error',
        product: null,
      };
      return newState;
    },
  },
});

export const cardProductReducer = getCardProduct.reducer;

export const cardProductState = state => state.getCardProduct;
