import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAsyncReducer } from '../../helpers/toolkit/extraReducers';

export const fetchCardProduct = createAsyncThunk(
  'cardProduct/fetchCardProduct',
  async id => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
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
  name: 'cardProduct',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchCardProduct.pending, createAsyncReducer('product').pending)
      .addCase(
        fetchCardProduct.fulfilled,
        createAsyncReducer('product').fulfilled,
      )
      .addCase(
        fetchCardProduct.rejected,
        createAsyncReducer('product').rejected,
      );
  },
});

export const cardProductReducer = getCardProduct.reducer;

export const cardProductState = state => state.cardProduct;
