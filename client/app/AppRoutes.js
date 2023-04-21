import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AllProducts from "../features/allProducts/AllProducts.js";
import AllUsers from "../features/allUsers/AllUsers.js";
import AuthForm from "../features/auth/AuthForm";
import Cart from "../features/cart/Cart.js";
import Checkout from "../features/checkout/Checkout.js";
import CreateProduct from "../features/createProduct/CreateProduct.js";
import Home from "../features/home/Home";
import SingleProduct from "../features/singleProduct/SingleProduct.js";
import SingleUser from "../features/singleUser/SingleUser.js";
import { me } from "./store";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Routes>
          <Route to="/home" element={<Home />} />
          {isAdmin && (
            <Route path="/createProduct" element={<CreateProduct />} />
          )}
          {isAdmin && <Route path="/users" element={<AllUsers />} />}
          {isAdmin && <Route path="/users/:id" element={<SingleUser />} />}
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
