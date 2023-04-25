import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const CartItem = ({ item, cartId, removeFromCart }) => {
  const [itemQty, setItemQty] = useState(item.order_products.quantity);
  const dispatch = useDispatch();

  return (
    <li key={item.id}>
      {item.name} - ${item.price}
      <label>Qty</label>
      <p>{itemQty}</p>
      <button
        onClick={() => {
          if (itemQty > 1) {
            setItemQty(itemQty - 1);
          }
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          setItemQty(itemQty + 1);
        }}
      >
        +
      </button>
      <button onClick={() => removeFromCart(cartId, item.id)}>Remove</button>
    </li>
  );
};

export default CartItem;
