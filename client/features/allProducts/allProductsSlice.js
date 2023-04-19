import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllProductsAsync = createAsyncThunk(
  'products/fetchAll',
  async () => {}
);

export const addProductAsync = createAsyncThunk(
  'products/addProduct',
  async () => {}
);

export const deleteProductAsync = createAsyncThunk(
  'products/fetchAll',
  async () => {}
);

const allProductsSlice = createSlice({
  name: 'allProducts',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {},
});

export const selectProducts = (state) => state.allProducts;

export default allProductsSlice.reducer;
