import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllUsersAsync, selectAllUsers } from "./allUsersSlice";

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
      <table width="50%">
        <tr>
          <td> </td>
          <td>USERNAME</td>
          <td>EMAIL</td>
          <td>ORDERS</td>
          <td>CART</td>
        </tr>
        {allUsers &&
          allUsers.map((user) => {
            return (
              <tr key={user.id} className="userCard">
                <td>{user.isAdmin ? `A` : ` `}</td>
                <td>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </td>
                <td>{user.email}</td>
                <td>
                  {user.orders.filter((order) => order.isFulfilled).length}
                </td>
                <td>
                  {user.orders.filter((order) => !order.isFulfilled).length}
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default AllUsers;
