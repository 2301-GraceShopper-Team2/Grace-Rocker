import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthForm from '../features/auth/AuthForm';
import Home from '../features/home/Home';
import { me } from './store';
import AllUsers from '../features/allUsers/AllUsers.js';
import SingleUser from '../features/singleUser/SingleUser.js';
import AllProducts from '../features/allProducts/AllProducts.js';
import SingleProduct from '../features/singleProduct/SingleProduct.js';
import Cart from '../features/cart/Cart.js';
import CreateProduct from '../features/createProduct/CreateProduct.js';
import Checkout from '../features/checkout/Checkout.js';

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route to="/home" element={<Home />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />

          <Route path="/users" element={<AllUsers />} />

          <Route path="/users/:id" element={<SingleUser />} />

          <Route path="/products" element={<AllProducts />} />

          <Route path="/products/:id" element={<SingleProduct />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/createProduct" element={<CreateProduct />} />

          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
