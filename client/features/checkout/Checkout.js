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
    <div className="container" style={{ marginBottom: "50px" }}>
      <h2>Checkout</h2>
      {order && order.isFulfilled === true ? (
        <h3 className="text-success">Order #{id} successful!</h3>
      ) : (
        <h3 className="text-danger">
          There was a problem processing your order.
        </h3>
      )}
      {order && order.products && (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>PRODUCT</th>
              <th>QTY</th>
              <th>PRICE</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.order_products.quantity}</td>
                  <td>${product.price * product.order_products.quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {/* <p>Address to ship to</p> */}
      {order && order.products && (
        <p className="lead">Total price: ${renderTotal(order)}</p>
      )}
      {order && !order.isFulfilled && (
        <div className="mb-3">
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/cart")}
          >
            Return to Cart
          </button>
        </div>
      )}

      <div>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Checkout;
