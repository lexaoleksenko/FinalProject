import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllProducts = createAsyncThunk(
  'getAllProducts/fetchAllProducts',
  async () => {
    try {
      const { data } = await axios.get('/api/products');
      return data;
    } catch (error) {
      console.warn(error);
    }
  },
);

const initialState = {
  products: null,
  status: 'loading',
};

export const getAllProd = createSlice({
  name: 'getAllProducts',
  initialState,
  extraReducers: {
    [fetchAllProducts.pending]: state => {
      const newState = {
        ...state,
        status: 'loading',
        products: null,
      };
      return newState;
    },
    [fetchAllProducts.fulfilled]: (state, action) => {
      const newState = {
        ...state,
        status: 'loaded',
        products: [action.payload],
      };
      return newState;
    },
    [fetchAllProducts.rejected]: state => {
      const newState = {
        ...state,
        status: 'error',
        products: null,
      };
      return newState;
    },
  },
});

export const allProdReducer = getAllProd.reducer;

export const allProdState = state => state.getAllProducts;
