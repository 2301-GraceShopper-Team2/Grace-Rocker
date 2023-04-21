import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <h1>
          <Link to="/home">Grace Rocker</Link>
        </h1>
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              {isAdmin && <Link to="/users">Users</Link>}
              {isAdmin && <Link to="/createProduct">Create Product</Link>}
              <Link to="/products">Products</Link>
              <Link to="/cart">Cart</Link>
              <button type="button" onClick={logoutAndRedirectHome}>
                Logout
              </button>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/products">Products</Link> |
              <Link to="/login">Login</Link> |<Link to="/signup">Sign Up</Link>{" "}
              |<Link to="/cart">Cart</Link>
            </div>
          )}
        </nav>
      </div>
      <hr />
    </div>
  );
};

export default Navbar;
