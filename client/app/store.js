import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import allProductsReducer from '../features/allProducts/AllProductsSlice';
import allUsersReducer from '../features/allUsers/allUsersSlice';
import authReducer from '../features/auth/authSlice';
import singleUserReducer from '../features/singleUser/singleUserSlice.js';
import singleProductReducer from '../features/singleProduct/singleProductSlice.js';
import cartReducer from '../features/cart/cartSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    allUsers: allUsersReducer,
    allProducts: allProductsReducer,
    singleUser: singleUserReducer,
    singleProduct: singleProductReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';
