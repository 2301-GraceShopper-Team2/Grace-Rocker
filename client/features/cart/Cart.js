// This is the cart component
// path: client/features/cart/Cart.js

import axios from 'axios';
import React, { useEffect } from 'react';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  deleteProductFromCartAsync,
  fetchCartAsync,
  selectCart,
} from "./cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const me = useSelector((state) => state.auth.me);

  const cart = useSelector(selectCart);

  const assignCart = async () => {
    if (me && me.id) {
      await dispatch(fetchCartAsync(me.id));
    } else {
      //else fetch cart from state using localstorage so when guest refreshes page, the cart will still be there
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      dispatch({ type: "cart/setGuestCart", payload: guestCart });
    }
  };

  const updateOrder = async () => {
    await axios.put(`/api/cart/${cart.id}`);
    await axios.post(`/api/user/${me.id}/cart`);
  };

  const handleCheckout = () => {
    updateOrder().then(navigate(`/checkout/${cart.id}`));
  };

  const removeFromCart = (orderId, productId) => {
    if (me && me.id) {
      dispatch(deleteProductFromCartAsync({ orderId, productId }));
    } else {
      // remove the product from the guest cart and update localstorage
      const updatedGuestCart = cart.filter((item) => item.id !== productId);
      localStorage.setItem("guestCart", JSON.stringify(updatedGuestCart));
      dispatch({ type: "cart/setGuestCart", payload: updatedGuestCart });
    }
  };

  useEffect(() => {
    assignCart();
  }, []);

  const totalPrice =
    cart.products && cart.products.length > 0
      ? cart.products.reduce((acc, item) => {
          return acc + item.price * item.order_products.quantity;
        }, 0)
      : 0;

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cart &&
          cart.products &&
          cart.products.length > 0 &&
          cart.products.map((item) => (

            <CartItem
              key={item.id}
              item={item}
              cartId={cart.id}
              removeFromCart={removeFromCart}
            />

          ))}
      </ul>
      {cart && cart.products && cart.products.length > 0 && (
        <button onClick={() => handleCheckout()}>Checkout</button>
      )}
      <p>Total: ${totalPrice}</p>
    </div>
  );
};

export default Cart;

// This is the cart component
