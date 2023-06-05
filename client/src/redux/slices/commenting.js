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

export const editCommentProduct = createAsyncThunk(
  'commenting/editCommentProduct',
  async ({ newComment, commentId }) => {
    try {
      const { data } = await axios.put(
        `/api/comments/${commentId}`,
        newComment,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return data;
    } catch (error) {
      console.warn(error);
    }
  },
);

export const deleteCommentProduct = createAsyncThunk(
  'commenting/deleteCommentProduct',
  async commentId => {
    console.log('commentId_RED', commentId);
    try {
      const { data } = await axios.delete(`/api/comments/${commentId}`);
      console.log('data', data);
      return data;
    } catch (error) {
      console.warn('axiosErr', error);
    }
  },
);

const initialState = {
  productComments: null,
  newComment: null,
  status: 'loading',
  isEditModalOpen: false,
  editCommentId: null,
  editCommentData: null,
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
    toogleEditModal: (state, action) => {
      const newState = {
        ...state,
        isEditModalOpen: !state.isEditModalOpen,
        editCommentId: action.payload.id,
        editCommentData: action.payload.data,
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
      )
      .addCase(
        editCommentProduct.pending,
        createAsyncReducer('newComment').pending,
      )
      .addCase(
        editCommentProduct.fulfilled,
        createAsyncReducer('newComment').fulfilled,
      )
      .addCase(
        editCommentProduct.rejected,
        createAsyncReducer('newComment').rejected,
      )
      .addCase(
        deleteCommentProduct.pending,
        createAsyncReducer('newComment').pending,
      )
      .addCase(
        deleteCommentProduct.fulfilled,
        createAsyncReducer('newComment').fulfilled,
      )
      .addCase(
        deleteCommentProduct.rejected,
        createAsyncReducer('newComment').rejected,
      );
  },
});
export const { clearComments, toogleEditModal } = commentingSlice.actions;
export const commentsProductState = state => state.commenting;
export const commentingReducer = commentingSlice.reducer;
