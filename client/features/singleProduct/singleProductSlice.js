import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSingleProductAsync = createAsyncThunk(
  'singleProduct/fetchSingleProduct',
  async (id) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      return data;
    } catch (err) {
      return err;
    }
  }
);

export const editProductAsync = createAsyncThunk(
  'updateProduct',
  async ({ id, name, description, price, SKU, imageURL }) => {
    try {
      const { data } = await axios.put(`/api/products/${id}`, {
        name,
        description,
        price,
        SKU,
        imageURL,
      });
      return data;
    } catch (err) {
      return err;
    }
  }
);

export const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(editProductAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectSingleProduct = (state) => state.singleProduct;

export default singleProductSlice.reducer;

// Path: client/features/singleProduct/SingleProduct.js
