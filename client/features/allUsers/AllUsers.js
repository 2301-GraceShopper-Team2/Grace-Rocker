import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllUsersAsync, selectAllUsers } from './allUsersSlice';

const AllUsers = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector(selectAllUsers);
  useEffect(() => {
    dispatch(fetchAllUsersAsync());
  }, [dispatch]);

  // const fetchOrder = async () => {
  //   const { data } = await axios.get(`/api/orders/${id}`);
  //   setOrder(data);
  // };

  return (
    <div>
      <h2>Admin Control Panel: Users</h2>
      <table className="table">
        <thead>
          <tr>
            <td scope="col">ACCESS</td>
            <td scope="col">USERNAME</td>
            <td scope="col">EMAIL</td>
            <td scope="col">ORDERS</td>
            <td scope="col">CART</td>
          </tr>
        </thead>
        <tbody>
          {allUsers &&
            allUsers.map((user) => {
              return (
                <tr key={user.id}>
                  <td scope="col">{user.isAdmin ? `admin` : `user`}</td>
                  <td scope="col">
                    <Link to={`/users/${user.id}`}>{user.username}</Link>
                  </td>
                  <td scope="col">{user.email}</td>
                  <td className="text-center" scope="col">
                    {user.orders.filter((order) => order.isFulfilled).length}
                  </td>
                  <td className="text-center" scope="col">
                    {user.orders.filter((order) => !order.isFulfilled).length}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
