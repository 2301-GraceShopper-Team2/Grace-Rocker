import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllProductsAsync = createAsyncThunk(
  'products/fetchAll',
  async () => {
    try {
      const { data } = await axios.get('/api/products');
      return data;
    } catch (err) {
      return err;
    }
  }
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
  extraReducers: (builder) => {
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectProducts = (state) => state.allProducts;

export default allProductsSlice.reducer;
