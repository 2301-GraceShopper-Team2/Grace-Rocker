import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editUser, fetchSingleUser, selectUser } from './singleUserSlice';

const SingleUser = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [username, setUsername] = useState('username');
  const [email, setEmail] = useState('email@address.com');

  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchSingleUser(id)).then(() => {
      setUsername(user.username);
      setEmail(user.email);
    });
  }, [dispatch, id, user.username, user.email]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (username === '') {
      setUsername(user.username);
    }
    if (email === '') {
      setEmail(user.email);
    }
    dispatch(editUser({ id, username, email })).then(() => {
      dispatch(fetchSingleUser(id));
    });
  };

  //tier 2 - create a sub-component called "OrderHistory" which takes an order ID as a prop and renders a row of order history for the profile view
  return (
    <>
      <div className="my-4">
        <h2 className="mb-3">User Profile for {user.username}</h2>
        <h3>{user.email}</h3>
        {user.orders && (
          <div className="mt-4">
            <h4>Your Orders</h4>
            {user.orders && user.orders.length > 0 ? (
              user.orders.map((order) => {
                return (
                  <div key={order.id}>
                    Order #{JSON.stringify(order.id)}:{' '}
                    {order.isFulfilled
                      ? `Purchase completed on `
                      : `Cart last updated on `}
                    {order.updatedAt}
                  </div>
                );
              })
            ) : (
              <div>no current orders</div>
            )}
          </div>
        )}
      </div>
      <h2 className="my-4">Update User Info</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            placeholder="username"
            value={username}
            onChange={(evt) => setUsername(evt.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-warning">
          Submit
        </button>
      </form>
    </>
  );
};

export default SingleUser;
