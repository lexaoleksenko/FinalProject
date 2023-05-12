import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCartProducts = createAsyncThunk(
  'cartBack/fetchCartProducts',
  async token => {
    try {
      const { data } = await axios.get(`/api/cart`, {
        headers: {
          Authorization: token,
        },
      });
      const { products } = data;
      return products;
    } catch (error) {
      console.warn(error);
    }
  },
);

export const fetchAddProductsCart = createAsyncThunk(
  'cartBack/fetchAddProductsCart',
  async ({ token, productId }) => {
    try {
      const { data } = await axios.put(`/api/cart/${productId}`, null, {
        headers: {
          Authorization: token,
        },
      });
      return data;
    } catch (error) {
      console.warn(error);
    }
  },
);

export const fetchDelProductsCart = createAsyncThunk(
  'cartBack/fetchDelProductsCart',
  async ({ token, productId }) => {
    try {
      const { data } = await axios.delete(`/api/cart/${productId}`, {
        headers: {
          Authorization: token,
        },
      });
      return data;
    } catch (error) {
      console.warn(error);
    }
  },
);

export const fetchDelProductQuant = createAsyncThunk(
  'cartBack/fetchDelProductQuant',
  async ({ token, productId }) => {
    try {
      const { data } = await axios.delete(`/api/cart/product/${productId}`, {
        headers: {
          Authorization: token,
        },
      });
      return data;
    } catch (error) {
      console.warn(error);
    }
  },
);

const initialState = {
  productsCartBack: null,
  statusCartBack: 'loading',
};

export const cartBack = createSlice({
  name: 'cartBack',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchCartProducts.pending, state => {
        const newState = {
          ...state,
          statusCartBack: 'loading',
          productsCartBack: null,
        };
        return newState;
      })
      .addCase(fetchCartProducts.fulfilled, (state, action) => {
        const newState = {
          ...state,
          statusCartBack: 'loaded',
          productsCartBack: action.payload,
        };
        return newState;
      })
      .addCase(fetchCartProducts.rejected, state => {
        const newState = {
          ...state,
          statusCartBack: 'error',
          productsCartBack: null,
        };
        return newState;
      })
      .addCase(fetchAddProductsCart.pending, state => {
        const newState = {
          ...state,
          statusCartBack: 'loading',
          productsCartBack: null,
        };
        return newState;
      })
      .addCase(fetchAddProductsCart.fulfilled, (state, action) => {
        const newState = {
          ...state,
          statusCartBack: 'loaded',
          productsCartBack: action.payload.products,
        };
        return newState;
      })
      .addCase(fetchAddProductsCart.rejected, state => {
        const newState = {
          ...state,
          statusCartBack: 'error',
          productsCartBack: null,
        };
        return newState;
      })
      .addCase(fetchDelProductsCart.pending, state => {
        const newState = {
          ...state,
          statusCartBack: 'loading',
          productsCartBack: null,
        };
        return newState;
      })
      .addCase(fetchDelProductsCart.fulfilled, (state, action) => {
        const newState = {
          ...state,
          statusCartBack: 'loaded',
          productsCartBack: action.payload.products,
        };
        return newState;
      })
      .addCase(fetchDelProductsCart.rejected, state => {
        const newState = {
          ...state,
          statusCartBack: 'error',
          productsCartBack: null,
        };
        return newState;
      })
      .addCase(fetchDelProductQuant.pending, state => {
        const newState = {
          ...state,
          statusCartBack: 'loading',
          productsCartBack: null,
        };
        return newState;
      })
      .addCase(fetchDelProductQuant.fulfilled, (state, action) => {
        const newState = {
          ...state,
          statusCartBack: 'loaded',
          productsCartBack: action.payload.products,
        };
        return newState;
      })
      .addCase(fetchDelProductQuant.rejected, state => {
        const newState = {
          ...state,
          statusCartBack: 'error',
          productsCartBack: null,
        };
        return newState;
      });
  },
});

export const cartBackReducer = cartBack.reducer;
export const cartBackState = state => state.cartBack;
