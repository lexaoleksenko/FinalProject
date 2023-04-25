import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// export const fetchCartProduct = createAsyncThunk(
//   'getCartProduct /fetchCartProduct',
//   async params => {
//     try {
//       const { data } = await axios.get(`/api/products/${params}`);
//       console.log('CartProduct >>>>>', data);
//       return data;
//     } catch (error) {
//       console.warn(error);
//     }
//   },
// );

const localStorageProduct = localStorage.getItem('products')
  ? JSON.parse(localStorage.getItem('products'))
  : [];

const initialState = {
  products: localStorageProduct,
  stateDrawer: false,
  status: 'loading',
};

const shoppingCartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProducts(state, action) {
      const newState = {
        ...state,
        products: [...state.products, action.payload],
      };
      return newState;
    },
    setProducts(state, action) {
      const newState = {
        ...state,
        products: action.payload,
      };
      return newState;
    },
    toggleDrawer(state, action) {
      const newState = {
        ...state,
        stateDrawer: action.payload,
      };
      return newState;
    },
  },
  // extraReducers: {
  //   [fetchCartProduct.pending]: state => {
  //     const newState = {
  //       ...state,
  //       status: 'loading',
  //     };
  //     return newState;
  //   },
  //   [fetchCartProduct.fulfilled]: (state, action) => {
  //     const newState = {
  //       ...state,
  //       status: 'loaded',
  //       products: [...state.products, action.payload],
  //     };
  //     return newState;
  //   },
  //   [fetchCartProduct.rejected]: state => {
  //     const newState = {
  //       ...state,
  //       status: 'error',
  //     };
  //     return newState;
  //   },
  // },
});

export const { setProducts, addProducts, toggleDrawer } =
  shoppingCartSlice.actions;
export const stateCartProd = state => state.cart.products;
export const stateDrawer = state => state.cart.stateDrawer;
export const cartReducer = shoppingCartSlice.reducer;
