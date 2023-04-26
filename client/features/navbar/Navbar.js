import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../app/store';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top ">
      <div>
        <Link className="navbar-brand text-center" to="/home">
          Grace Rocker
        </Link>
      </div>
      <div className="collapse navbar-collapse navbar-nav">
        {isLoggedIn ? (
          <ul className="navbar-nav">
            {isAdmin && (
              <li className="nav-item text-light">
                <Link className="nav-link" to="/users">
                  Users
                </Link>
              </li>
            )}
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/createProduct">
                  Create Product
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart
              </Link>
            </li>

            <li className="nav-item">
              <button
                className="btn btn-link nav-link"
                type="button"
                onClick={logoutAndRedirectHome}
              >
                Logout
              </button>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Sign Up
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
