import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../../app/store';

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    let email;
    if (name === 'signup') email = evt.target.email.value;
    name === 'signup'
      ? dispatch(authenticate({ username, password, email, method: formName }))
      : dispatch(authenticate({ username, password, method: formName }));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card mt-4 mb-4">
            <div className="card-body">
              <h2 className="card-title text-center">{displayName}</h2>
              <form onSubmit={handleSubmit} name={name}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input className="form-control" name="username" type="text" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    className="form-control"
                    name="password"
                    type="password"
                  />
                </div>
                {name === 'signup' && (
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" name="email" type="email" />
                  </div>
                )}
                <div className="form-group text-center mt-4">
                  <button className="btn btn-warning btn-block" type="submit">
                    {displayName}
                  </button>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
