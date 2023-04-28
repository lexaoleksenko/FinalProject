import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllProducts = createAsyncThunk(
  'getAllProducts/fetchAllProducts',
  async params => {
    const filterParams = params ?? '';
    try {
      const { data } = await axios.get(
        `/api/products/filter?${filterParams}&perPage=9&`,
      );
      return data;
    } catch (error) {
      console.warn(error);
    }
  },
);

const initialState = {
  products: null,
  status: 'loading',
  filterMinPrice: 600,
  filterMaxPrice: 2000,
  selectPage: 1,
};

export const getAllProd = createSlice({
  name: 'getAllProducts',
  initialState,
  reducers: {
    setMinPrice: (state, action) => {
      const newState = {
        ...state,
        filterMinPrice: action.payload,
      };
      return newState;
    },
    setMaxPrice: (state, action) => {
      const newState = {
        ...state,
        filterMaxPrice: action.payload,
      };
      return newState;
    },
    setSelectPage: (state, action) => {
      const newState = {
        ...state,
        selectPage: action.payload,
      };
      return newState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllProducts.pending, state => {
        const newState = {
          ...state,
          status: 'loading',
          products: null,
        };
        return newState;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        const newState = {
          ...state,
          status: 'loaded',
          products: action.payload,
        };
        return newState;
      })
      .addCase(fetchAllProducts.rejected, state => {
        const newState = {
          ...state,
          status: 'error',
          products: null,
        };
        return newState;
      });
  },
});

export const allProdReducer = getAllProd.reducer;

export const { setMinPrice, setMaxPrice, setSelectPage } = getAllProd.actions;

export const allProdState = state => state.getAllProducts;
