// Redux slice for Cart
// Path: client/features/cart/cartSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartAsync = createAsyncThunk(
  "cart/fetchCart",
  async (userId) => {
    try {
      const { data } = await axios.get(`/api/user/${userId}/cart`);
      console.log("data: ", data);
      return data;
    } catch (err) {
      return err;
    }
  },
);

export const addProductToCartAsync = createAsyncThunk(
  "cart/addProductToCart",
  async (productId, thunkAPI) => {
    console.log("thunkAPI", thunkAPI);
    const me = thunkAPI.getState().auth.me;
    if (me && me.id) {
      try {
        const { data } = await axios.post(
          `/api/cart/${me.id}/product/${productId}`,
        );
        if (data.id) {
          // return newly created product_order with ID
          return data;
        } else {
          // send browser alert "Product already in cart"
          alert(data);
        }
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

export const changeQuantityInCartAsync = createAsyncThunk(
  "cart/changeQuantityInCart",
  async ({ orderId, val, productId }) => {
    try {
      const { data } = await axios.put(
        `/api/cart/${orderId}/product/${productId}`,
        { val },
      );
      return data;
    } catch (err) {
      return err;
    }
  },
);

export const deleteProductFromCartAsync = createAsyncThunk(
  "cart/deleteProductFromCart",
  async ({ orderId, productId }) => {
    try {
      const { data } = await axios.delete(
        `/api/cart/${orderId}/product/${productId}`,
      );
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
        if (action.payload) {
          state.userCart.push(action.payload);
        }
      }
    });
    builder.addCase(deleteProductFromCartAsync.fulfilled, (state, action) => {
      state.userCart.products = state.userCart.products.filter(
        (product) => product.id !== action.payload,
      );
    });
    builder.addCase(changeQuantityInCartAsync.fulfilled, (state, action) => {
      // console.log("action.payload: ", action.payload);
      // console.log("id in payload: ", action.payload.productInCart.id);
      const editedProductsArray = state.userCart.products.filter((product) => {
        // console.log("id in filter: ", product.order_products.id);
        return (
          parseInt(product.order_products.id) ===
          parseInt(action.payload.productInCart.id)
        );
      });
      // console.log("array upon filter: ", editedProductsArray);
      const editedProduct = editedProductsArray[0];
      const rewriteIndex = state.userCart.products.indexOf(editedProduct);
      // console.log("rewrite index: ", rewriteIndex);

      //destructure and update just the row of the updated product
      //overwrite the nested object with the new version of the nested object
      //spread operation -- such and such isn't iterable,
      //could build an entirely new object write that to state
      state.userCart.products = state.userCart.products;
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
