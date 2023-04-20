import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../app/store";

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    let email;
    if (name === "signup") email = evt.target.email.value;
    name === "signup"
      ? dispatch(authenticate({ username, password, email, method: formName }))
      : dispatch(authenticate({ username, password, method: formName }));
  };

  return (
    <div>
      <h2>{displayName}</h2>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        {name === "signup" && (
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="email" />
          </div>
        )}
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && <div> {error} </div>}
      </form>
    </div>
  );
};

export default AuthForm;
