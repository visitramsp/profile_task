import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  productList: [],
  offerPriceList: [],
  getAll: null,
  orderList: {}
};

export const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    setProductList(state, action) {
      state.productList = action.payload;
    },
    setOrderList(state, action) {
      state.orderList = action.payload;
    },
    addProductList(state, action) {
      state.productList = [...state.productList, ...action.payload];
    },
    updateWishlist(state, action) {
      const index = action.payload.index;
      state.productList[index].isInWishlist =
        !state.productList[index].isInWishlist;
    },
    setOfferPriceList(state, action) {
      state.offerPriceList = action.payload;
    },
    addOfferPriceList(state, action) {
      state.offerPriceList = [...state.offerPriceList, ...action.payload];
    },
    setAllTypes(state, action) {
      state.getAll = action.payload;
    }
    // setOfferPriceList
    // removeWishlist(state, action) {
    //   state.wholesalesProductList = action.payload;
    // }
  }
});

export const {
  setProductList,
  setOrderList,
  addProductList,
  updateWishlist,
  setOfferPriceList,
  addOfferPriceList,
  setAllTypes
  // removeWishlist
} = vendorSlice.actions;
