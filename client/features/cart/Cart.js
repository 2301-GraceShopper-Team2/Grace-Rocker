// This is the cart component
// path: client/features/cart/Cart.js
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteProductFromCartAsync,
  fetchCartAsync,
  selectCart,
} from "./cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const me = useSelector((state) => state.auth.me);

  const cartItems = useSelector(selectCart);

  const assignCart = async () => {
    if (me && me.id) {
      await dispatch(fetchCartAsync(me.id));
    }
    //else fetch cart from state
  };

  const updateOrder = async () => {
    await axios.put(`/api/cart/${cartItems.id}`);
    await axios.post(`/api/user/${me.id}/cart`);
  };

  const handleCheckout = () => {
    updateOrder().then(navigate(`/checkout/${cartItems.id}`));
  };

  const removeFromCart = (productId) => {
    dispatch(deleteProductFromCartAsync(productId));
  };

  useEffect(() => {
    assignCart();
  }, []);

  // const totalPrice =
  //   cartItems.products && cartItems.products.length > 0
  //     ? cartItems.products.reduce((acc, item) => {
  //         return acc + item.price * item.order_products.quantity;
  //       }, 0)
  //     : 0;

  // check if me exists and has an id. If not, display a message to log in.
  if (!me || !me.id) {
    return <div>Please log in to view your cart</div>;
  }

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cartItems.products &&
          cartItems.products.length > 0 &&
          cartItems.products.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price} - {item.order_products.quantity}{" "}
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
      </ul>
      <button onClick={() => handleCheckout()}>Checkout</button>
      {/* <p>Total: ${totalPrice}</p> */}
    </div>
  );
};

export default Cart;

// This is the cart component
