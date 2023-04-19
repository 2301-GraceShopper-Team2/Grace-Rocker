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

  return (
    <div>
      <h2>All Users (Admin Only)</h2>
      <ul>
        {allUsers &&
          allUsers.map((user) => {
            return (
              <li key={user.id}>
                <Link to={`/users/${user.id}`}>Username: {user.username}</Link>{" "}
                | Email: {user.email} | Items in Cart: {user.orders.length}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default AllUsers;
