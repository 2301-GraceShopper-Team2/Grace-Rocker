import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Checkout = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const navigate = useNavigate();

  const fetchOrder = async () => {
    const { data } = await axios.get(`/api/orders/${id}`);
    setOrder(data);
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const renderTotal = (order) => {
    let runningTotal = 0;
    order.products.forEach((product) => {
      runningTotal += product.price * product.order_products.quantity;
    });
    return runningTotal;
  };

  return (
    <div>
      <h2>Checkout</h2>
      {order && order.isFulfilled === true ? (
        <h3>Order #{id} successful!</h3>
      ) : (
        <h3>There was a problem processing your order.</h3>
      )}
      {order && order.products && (
        <table width="80%">
          <tr key="header">
            <td>PRODUCT</td>
            <td>QTY</td>
            <td>PRICE</td>
          </tr>
          {order.products.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.order_products.quantity}</td>
                <td>${product.price * product.order_products.quantity}</td>
              </tr>
            );
          })}
        </table>
      )}
      {/* <p>Address to ship to</p> */}
      {order && order.products && <p>Total price: ${renderTotal(order)}</p>}
      {order && !order.isFulfilled && (
        <div>
          <button onClick={() => navigate("/cart")}>Return to Cart</button>
        </div>
      )}

      <div>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    </div>
  );
};
export default Checkout;
