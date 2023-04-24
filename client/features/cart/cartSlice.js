// Redux slice for Cart
// Path: client/features/cart/cartSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartAsync = createAsyncThunk(
  "cart/fetchCart",
  async (userId) => {
    try {
      console.log("fetching card for user id: ", userId);
      const { data } = await axios.get(`/api/user/${userId}/cart`);
      console.log("got the data as: ", data);
      return data;
    } catch (err) {
      return err;
    }
  },
);

export const addProductToCartAsync = createAsyncThunk(
  "cart/addProductToCart",
  async (productId, thunkAPI) => {
    const me = thunkAPI.getState().auth.me;

    if (me && me.id) {
      try {
        const { data } = await axios.post(`/api/cart/${me.id}/product/${productId}`);
        return data;
      } catch (err) {
        return err;
      }
    } else {
      // handle guest cart
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      const existingProduct = guestCart.find((item) => item.id === productId);

      if (existingProduct) {
        existingProduct.order_products.quantity += 1;
      } else {
        const { data: product } = await axios.get(`/api/products/${productId}`);
        product.order_products = { quantity: 1 };
        guestCart.push(product);
      }
      // update guest cart in localstorage
      localStorage.setItem("guestCart", JSON.stringify(guestCart));

      // return the guest cart to update the Redux state
      return guestCart;
    }
  },
);

export const deleteProductFromCartAsync = createAsyncThunk(
  "cart/deleteProductFromCart",
  async (productId) => {
    try {
      const { data } = await axios.delete(`/api/cart/${productId}`);
      return data;
    } catch (err) {
      return err;
    }
  },
);

const initialState = {
  userCart: [],
  guestCart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setGuestCart: (state, action) => {
      state.guestCart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartAsync.fulfilled, (state, action) => {
      state.userCart = action.payload;
    });
    builder.addCase(addProductToCartAsync.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) {
        // Guest Cart
        state.guestCart = action.payload;
      } else {
        // User Cart - logged in
        state.userCart.push(action.payload);
      }
    });
    builder.addCase(deleteProductFromCartAsync.fulfilled, (state, action) => {
      return state.filter((product) => product.id != action.payload);
    });
  },
});

export const selectCart = (state) => {
  if (state.auth.me && state.auth.me.id) {
    return state.cart.userCart;
  } else {
    return state.cart.guestCart;
  }
};

export default cartSlice.reducer;

// Path: client/features/cart/Cart.js
