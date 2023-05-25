import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchData } from '../../helpers/toolkit/fetches';
import { createAsyncReducer } from '../../helpers/toolkit/extraReducers';

export const fetchCustomerData = createAsyncThunk(
  'customer/fetchCustomer',
  async () => {
    return fetchData(`/api/customers/customer`, 'get');
  },
);

const initialState = {
  customer: null,
  status: 'loading',
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(
        fetchCustomerData.pending,
        createAsyncReducer('customer').pending,
      )
      .addCase(
        fetchCustomerData.fulfilled,
        createAsyncReducer('customer').fulfilled,
      )
      .addCase(
        fetchCustomerData.rejected,
        createAsyncReducer('customer').rejected,
      );
  },
});

export const customerReducer = customerSlice.reducer;
