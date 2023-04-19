import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllUsers, selectAllUsers } from "./allUsersSlice";
const AllUsers = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector(selectAllUsers);
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);
  return (
    <div>
      <ul>
        {allUsers.map((user) => {
          return (
            <li key={user.id}>
              <Link to={`/users/${user.id}`}>Username: {user.username}</Link> |
              Email: {user.email} | Items in Cart: {user.orders.length}
            </li>
          );
        })}
      </ul>
      {JSON.stringify(allUsers)}
    </div>
  );
};
export default AllUsers;
