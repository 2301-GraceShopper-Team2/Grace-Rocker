import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeQuantityInCartAsync } from './cartSlice';

const CartItem = ({ item, cartId, removeFromCart }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    //needs to fetch item itself?
  }, [dispatch]);

  const handleClick = async (itemId, val) => {
    await dispatch(
      changeQuantityInCartAsync({ orderId: cartId, val, productId: itemId })
    );
  };

  const quantity = item.order_products?.quantity || 0;

  return (
    <li key={item.id} className="list-group-item">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          {item.name} - ${item.price}
        </div>
        <img src={item.imageUrl} />
        <div className="input-group">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => {
              if (quantity > 1) {
                handleClick(item.id, -1);
              }
            }}
          >
            -
          </button>
          <span className="input-group-text">{quantity}</span>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => {
              handleClick(item.id, 1);
            }}
          >
            +
          </button>
        </div>
        <button
          className="btn btn-outline-danger"
          onClick={() => removeFromCart(cartId, item.id)}
        >
          Remove
        </button>
      </div>
    </li>
  );
};

export default CartItem;
