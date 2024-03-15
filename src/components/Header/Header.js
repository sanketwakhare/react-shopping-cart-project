import React from "react";

import { NavLink } from "react-router-dom";
import "./header.scss";

const Header = ({ isLoggedIn, handleLogin, handleLogout }) => {
  return (
    <div className="header">
      <div className="logo">
        <NavLink to="/" key="home" className="nav-link">
          <i class="fa fa-shopping-bag" aria-hidden="true"></i>
        </NavLink>
      </div>
      <div className="nav">
        {isLoggedIn ? (
          // Display content for logged-in users
          <>
            <NavLink
              to="/category/electronics"
              key="electronics"
              className="nav-link"
            >
              Electronics
            </NavLink>
            <NavLink
              to="/category/clothing"
              key="clothing"
              className="nav-link"
            >
              Clothing
            </NavLink>
            <NavLink to="/cart" key="cart" className="nav-link">
              Cart
            </NavLink>
            <NavLink to="/logout" key="logout" className="nav-link">
              Logout
            </NavLink>
          </>
        ) : (
          // Display content for non-logged-in users
          <>
            <NavLink to="signup" className="nav-link">
              Sign up
            </NavLink>
            <NavLink to="login" className="nav-link">
              Sign in
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
