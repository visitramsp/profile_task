import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  inventoryData: [],
  categoryList: [],
  warehouseId: '',
  aboutList: [],
  faqData: [],
  fetched: false
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCategoryList(state, action) {
      state.categoryList = action.payload;
    },
    setInventoryData(state, action) {
      state.inventoryData = action.payload;
    },
    setWarehouseId(state, action) {
      state.warehouseId = action.payload;
    },
    setAboutList(state, action) {
      state.aboutList = action.payload;
    },
    faqDataSuccess: (state, action) => {
      state.faqData = action.payload;
    }
  }
});

export const {
  setCategoryList,
  setInventoryData,
  setWarehouseId,
  setAboutList,
  faqDataSuccess
} = appSlice.actions;
