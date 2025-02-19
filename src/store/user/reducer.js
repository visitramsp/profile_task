import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  userDetail: {},
  userDraftData: {},
  userLoginInfo: {
    email: '',
    password: '',
    remember: false
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetail(state, action) {
      state.userDetail = action.payload;
    },
    setUserLoginInfo(state, action) {
      state.userLoginInfo = action.payload;
    },
    toggleDefaultAddress(state, action) {
      const { id } = action.payload;
      state.userDetail.addresses.forEach((address) => {
        if (address.id === id) {
          address.is_default = 1; // Set selected address to default
        } else {
          address.is_default = 0; // Reset others to non-default
        }
      });
    },
    deleteWarehouseAddress(state, action) {
      const { id } = action.payload;
      state.userDetail.addresses = state.userDetail.addresses.filter(
        (address) => address.id !== id
      );
    },
    updateDraftData(state, action) {
      state.userDraftData = { ...state.userDraftData, ...action.payload };
    },
    deleteDraftData(state) {
      state.userDraftData = {};
    }
  }
});

export const {
  setUserDetail,
  toggleDefaultAddress,
  deleteWarehouseAddress,
  updateDraftData,
  deleteDraftData,
  setUserLoginInfo
} = userSlice.actions;
