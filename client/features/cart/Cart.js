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
    } else { //else fetch cart from state using localstorage so when guest refreshes page, the cart will still be there
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      dispatch({ type: "cart/setGuestCart", payload: guestCart});
    }
    
  };

  const removeFromCart = (productId) => {
    dispatch(deleteProductFromCartAsync(productId));
    if (me && me.id) {
  } else {
    // remove the product from the guest cart and update localstorage
    const updatedGuestCart = cartItems.filter((item) => item.id !== productId);
    localStorage.setItem("guestCart", JSON.stringify(updatedGuestCart));
    dispatch({ type: "cart/setGuestCart", payload: updatedGuestCart });
  }
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

  // check if me exists and has an id. If not, display a message to log in. -- Do Not need this anymore because we are using localstorage to store guest cart
  // if (!me || !me.id) {
  //   return <div>Please log in to view your cart</div>;
  // }

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
