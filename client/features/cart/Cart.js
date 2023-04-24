// This is the cart component
// path: client/features/cart/Cart.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductFromCartAsync,
  fetchCartAsync,
  selectCart,
} from "./cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.auth.me);

  const cartItems = useSelector(selectCart);

  const assignCart = async () => {
    if (me && me.id) {
      await dispatch(fetchCartAsync(me.id));
    }
    //else fetch cart from state
  };

  const removeFromCart = (productId) => {
    dispatch(deleteProductFromCartAsync(productId));
  };

  useEffect(() => {
    assignCart();
  }, []);

  // check if cartItems is an array using Array.isArray. If an array, use reduce to calculate the total price. If not an array, set the total price to 0.

  const totalPrice =
    cartItems.length > 0
      ? cartItems.reduce((acc, item) => {
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
      {/* {JSON.stringify(cartItems)} */}
      <ul>
        {cartItems.length > 0 &&
          cartItems.map((item) => (
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
