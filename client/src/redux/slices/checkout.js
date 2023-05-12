import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contactsForm: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  },
  contactsFormStatus: false,
  deliveryAddress: null,
  shipping: '',
  paymentInfo: '',
  deliveryPaymentStatus: false,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    updateFormName(state, action) {
      return {
        ...state,
        contactsForm: {
          ...state.contactsForm,
          firstName: action.payload,
        },
      };
    },
    updateFormLastName(state, action) {
      return {
        ...state,
        contactsForm: {
          ...state.contactsForm,
          lastName: action.payload,
        },
      };
    },
    updateFormEmail(state, action) {
      return {
        ...state,
        contactsForm: {
          ...state.contactsForm,
          email: action.payload,
        },
      };
    },
    updateFormPhoneNumber(state, action) {
      return {
        ...state,
        contactsForm: {
          ...state.contactsForm,
          phoneNumber: action.payload,
        },
      };
    },
    updateFormStatus(state, action) {
      return {
        ...state,
        contactsFormStatus: action.payload,
      };
    },
    updateDeliveryAddress(state, action) {
      return {
        ...state,
        deliveryAddress: action.payload,
      };
    },
    updateShipping(state, action) {
      return {
        ...state,
        shipping: action.payload,
      };
    },
    updatePaymentInfo(state, action) {
      return {
        ...state,
        paymentInfo: action.payload,
      };
    },
    updateDeliveryPaymentStatus(state, action) {
      return {
        ...state,
        deliveryPaymentStatus: action.payload,
      };
    },
  },
});

export const {
  updateFormName,
  updateFormLastName,
  updateFormEmail,
  updateFormPhoneNumber,
  updateFormStatus,
  updateDeliveryAddress,
  updateShipping,
  updatePaymentInfo,
  updateDeliveryPaymentStatus,
} = checkoutSlice.actions;

export const checkoutReducer = checkoutSlice.reducer;
export const checkoutState = state => state.checkout;
