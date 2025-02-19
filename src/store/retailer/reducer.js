import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  wholesalesProductList: []
};

export const retailerSlice = createSlice({
  name: 'retailer',
  initialState,
  reducers: {
    setWholesalesProductList(state, action) {
      state.wholesalesProductList = action.payload;
    },
    addWholesalesProductList(state, action) {
      state.wholesalesProductList = [
        ...state.wholesalesProductList,
        ...action.payload
      ];
    },
    updateWishlist(state, action) {
      const index = action.payload.index;
      state.wholesalesProductList[index].isInWishlist =
        !state.wholesalesProductList[index].isInWishlist;
    }
    // removeWishlist(state, action) {
    //   state.wholesalesProductList = action.payload;
    // }
  }
});

export const {
  setWholesalesProductList,
  addWholesalesProductList,
  updateWishlist
  // removeWishlist
} = retailerSlice.actions;
