import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import allUsersReducer from '../features/allUsers/allUsersSlice';
import allProductsReducer from '../features/allProducts/AllProductsSlice';
import singleUserReducer from '../features/singleUser/singleUserSlice.js';
// import singleProductReducer from '../features/singleProduct/singleProductSlice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    allUsers: allUsersReducer,
    allProducts: allProductsReducer,
    singleUser: singleUserReducer,
    // singleProduct: singleProductReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';
