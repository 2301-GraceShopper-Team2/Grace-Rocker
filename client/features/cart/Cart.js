// This is the cart component
// path: client/features/cart/Cart.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductFromCartAsync,
  fetchCartAsync,
  selectCart,
} from "./cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const me = useSelector((state) => state.auth.me);

  const cartItems = useSelector(selectCart);

  const assignCart = async () => {
    if (me && me.id) {
      await dispatch(fetchCartAsync(me.id));
      console.log;
      setCart(cartItems);
    }
    //else fetch cart from state
  };

  const removeFromCart = (productId) => {
    dispatch(deleteProductFromCartAsync(productId));
  };

  useEffect(() => {
    assignCart();
  }, [dispatch, me, assignCart]);

  // check if cartItems is an array using Array.isArray. If an array, use reduce to calculate the total price. If not an array, set the total price to 0.

  const totalPrice =
    cart.length > 0
      ? cart.reduce((acc, item) => {
          return acc + item.price * item.order_products.quantity;
        }, 0)
      : 0;

  // check if me exists and has an id. If not, display a message to log in.
  if (!me || !me.id) {
    return <div>Please log in to view your cart</div>;
  }

  return (
    <div>
      <h1>Cart</h1>
      {JSON.stringify(cart)}
      <ul>
        {cart.length > 0 &&
          cart.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price} - {item.order_products.quantity}{" "}
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
      </ul>
      <p>Total: ${totalPrice}</p>
    </div>
  );
};

export default Cart;

// This is the cart component
