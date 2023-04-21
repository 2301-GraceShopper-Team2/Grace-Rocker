import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//this renders most recently updated order for a user that has isFulfilled=true?
//or does it get
const Checkout = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const fetchOrder = async () => {
    const { data } = await axios.get(`/orders/${id}`);
    setOrder(data);
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div>
      {JSON.stringify(order)}
      <h2>Checkout</h2>
      <h3>Order #{id} successful!</h3>
      <p>Mapped Product name</p>
      <p>Mapped Product quantity</p>
      <p>Mapped Product price</p>
      <p>Address to ship to</p>
      <p>Total price of order</p>
      <button>Cancel Order</button>
      <button>Back to Home</button>
    </div>
  );
};
export default Checkout;
