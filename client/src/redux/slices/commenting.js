import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { createAsyncReducer } from '../../helpers/toolkit/extraReducers';
import { fetchData } from '../../helpers/toolkit/fetches';

export const fetchProductComments = createAsyncThunk(
  'commenting/fetchProductComments',
  async prodId => {
    return fetchData(`/api/comments/product/${prodId}`, 'get');
  },
);

export const addNewCommentProduct = createAsyncThunk(
  'commenting/addNewCommentProduct',
  async newComment => {
    try {
      const { data } = await axios.post('/api/comments', newComment, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return data;
    } catch (error) {
      console.warn(error);
    }
  },
);

const initialState = {
  productComments: null,
  newComment: null,
  status: 'loading',
};

const commentingSlice = createSlice({
  name: 'commenting',
  initialState,
  reducers: {
    clearComments: state => {
      const newState = {
        ...state,
        productComments: null,
      };
      return newState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        fetchProductComments.pending,
        createAsyncReducer('productComments').pending,
      )
      .addCase(
        fetchProductComments.fulfilled,
        createAsyncReducer('productComments').fulfilled,
      )
      .addCase(
        fetchProductComments.rejected,
        createAsyncReducer('productComments').rejected,
      )
      .addCase(
        addNewCommentProduct.pending,
        createAsyncReducer('newComment').pending,
      )
      .addCase(
        addNewCommentProduct.fulfilled,
        createAsyncReducer('newComment').fulfilled,
      )
      .addCase(
        addNewCommentProduct.rejected,
        createAsyncReducer('newComment').rejected,
      );
  },
});
export const { clearComments } = commentingSlice.actions;
export const commentsProductState = state => state.commenting;
export const commentingReducer = commentingSlice.reducer;
