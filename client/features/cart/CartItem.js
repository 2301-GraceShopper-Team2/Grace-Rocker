import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeQuantityInCartAsync } from "./cartSlice";

const CartItem = ({ item, cartId, removeFromCart }) => {
  const [itemQty, setItemQty] = useState(item.order_products.quantity);
  const dispatch = useDispatch();

  useEffect(() => {
    //needs to fetch item itself?
    console.log(item);
  }, [dispatch]);

  const handleClick = async (itemId, val) => {
    await dispatch(
      changeQuantityInCartAsync({ orderId: cartId, val, productId: itemId }),
      
    );
    //refresh page
  };

  return (
    <li key={item.id}>
      {item.name} - ${item.price}
      <label>Qty</label>
      <p>{itemQty}</p>
      <button
        onClick={() => {
          if (itemQty > 1) {
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
