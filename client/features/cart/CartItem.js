import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeQuantityInCartAsync } from "./cartSlice";

const CartItem = ({ item, cartId, removeFromCart }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    //needs to fetch item itself?
  }, [dispatch]);

  const handleClick = async (itemId, val) => {
    await dispatch(
      changeQuantityInCartAsync({ orderId: cartId, val, productId: itemId }),
    );
  };

  return (
    <li key={item.id}>
      {item.name} - ${item.price}
      <label>Qty</label>
      <p>{item.order_products.quantity}</p>
      <button
        onClick={() => {
          if (item.order_products.quantity > 1) {
            handleClick(item.id, -1);
          }
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          handleClick(item.id, 1);
        }}
      >
        +
      </button>
      <button onClick={() => removeFromCart(cartId, item.id)}>Remove</button>
    </li>
  );
};

export default CartItem;
