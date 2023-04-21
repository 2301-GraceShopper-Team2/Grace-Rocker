// This is the cart component
// path: client/features/cart/Cart.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCart, fetchCartAsync, deleteProductFromCartAsync } from "./cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCart);

  useEffect(() => {
    dispatch(fetchCartAsync());
  }, [dispatch]);

  const removeFromCart = (productId) => {
    dispatch(deleteProductFromCartAsync(productId));
  };

  // check if cartItems is an array using Array.isArray. If an array, use reduce to calculate the total price. If not an array, set the total price to 0.
  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => {
        return acc + item.price * item.order_product.quantity;
      }, 0)
    : 0;

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {Array.isArray(cartItems) &&
          cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price} - {item.order_product.quantity}{" "}
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