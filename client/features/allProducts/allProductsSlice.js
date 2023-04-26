import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProductsAsync = createAsyncThunk(
  "products/fetchAll",
  async () => {
    try {
      const { data } = await axios.get("/api/products");
      return data;
    } catch (err) {
      return err;
    }
  }
);
export const addProductAsync = createAsyncThunk(
  "products/addProduct",
  async ({ name, description, price, imageURL, SKU }) => {
    try {
      const { data } = await axios.post("/api/products", {
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

export const deleteProductAsync = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      return id;
    } catch (err) {
      return err;
    }
  }
);

const allProductsSlice = createSlice({
  name: "allProducts",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(addProductAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      return state.filter((product) => product.id != action.payload);
    });
    builder.addCase(deleteProductAsync.rejected, (state, action) => {
      alert(action.payload.message);
    });
  },
});

export const selectProducts = (state) => {
  return state.allProducts;
};

export default allProductsSlice.reducer;
