// This is the cart component
// path: client/features/cart/Cart.js

import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';

import {
  deleteProductFromCartAsync,
  fetchCartAsync,
  selectCart,
} from './cartSlice';

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
      const guestCart = JSON.parse(localStorage.getItem('guestCart')) || {
        products: [],
      };
      dispatch({ type: 'cart/setGuestCart', payload: guestCart });
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
      if (cart) {
        const updatedGuestCart = cart.products.filter(
          (item) => item.id !== productId
        );
        localStorage.setItem('guestCart', JSON.stringify(updatedGuestCart));
        dispatch({ type: 'cart/setGuestCart', payload: updatedGuestCart });
      }
    }
  };

  useEffect(() => {
    assignCart();
  }, []);

  const totalPrice =
    cart && cart.products && cart.products.length > 0
      ? cart.products.reduce((acc, item) => {
          return (
            acc +
            item.price *
              (item.order_products ? item.order_products.quantity : 0)
          );
        }, 0)
      : 0;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Cart</h2>
      <ul className="list-group">
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
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-warning mt-4"
            onClick={() => handleCheckout()}
          >
            Checkout
          </button>
        </div>
      )}
      <p className="text-end mt-3">Total: ${totalPrice}</p>
    </div>
  );
};

export default Cart;
