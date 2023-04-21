// Redux slice for Cart
// Path: client/features/cart/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartAsync = createAsyncThunk(
    "cart/fetchCart",
    async (userId) => {
        try {
            const { data } = await axios.get(`/user/${userId}/cart`);
            return data;
        } catch (err) {
            return err;
        }
    }
);

export const addProductToCartAsync = createAsyncThunk(
    "cart/addProductToCart",
    async (productId) => {
        try {
            const { data } = await axios.post("/api/cart", { productId });
            return data;
        } catch (err) {
            return err;
        }
    }
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
    }
);

export const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCartAsync.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(addProductToCartAsync.fulfilled, (state, action) => {
            state.push(action.payload);
        });
        builder.addCase(deleteProductFromCartAsync.fulfilled, (state, action) => {
            return state.filter((product) => product.id != action.payload);
        });
    }
});

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;

// Path: client/features/cart/Cart.js