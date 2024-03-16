import React from "react";

import { NavLink } from "react-router-dom";
import Search from "../Search/Search";
import "./header.scss";

const Header = ({ isLoggedIn, handleLogin, handleLogout }) => {
  return (
    <div className="header">
      <div className="nav">
        <div className="logo">
          <NavLink to="/" key="home" className="nav-link">
            <i className="fa fa-shopping-bag" aria-hidden="true"></i>
          </NavLink>
        </div>
        <NavLink
          to="/category/electronics"
          key="electronics"
          className="nav-link"
        >
          Electronics
        </NavLink>
        <NavLink
          to="/category/men's clothing"
          key="men's clothing"
          className="nav-link"
        >
          Men's Clothing
        </NavLink>
      </div>
      <div>
        <Search />
      </div>
      <div className="nav">
        {isLoggedIn ? (
          // Display content for logged-in users
          <>
            <NavLink to="/orders" key="orders" className="nav-link">
              Orders
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
            <NavLink to="login" className="nav-link">
              Sign in
            </NavLink>
            <NavLink to="signup" className="nav-link">
              Sign up
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
