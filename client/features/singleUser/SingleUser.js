import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editUser, fetchSingleUser, selectUser } from "./singleUserSlice";

const SingleUser = () => {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  console.log("user", user);

  useEffect(() => {
    dispatch(fetchSingleUser(id));
  }, [dispatch]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(editUser({ id, username, email }));
    setUsername("");
    setEmail("");
  };

  return (
    <>
      <div>
        <h2>Name: {user.username}</h2>
        <h4>Email: {user.email}</h4>
      </div>
      <h2>Update Info</h2>
      <form id="editUser" onSubmit={handleSubmit}>
        <label htmlFor="username"></label>

        <input
          placeholder="username"
          name="username"
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
        />

        <label htmlFor="email"></label>
        <input
          placeholder="Email"
          name="email"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SingleUser;
