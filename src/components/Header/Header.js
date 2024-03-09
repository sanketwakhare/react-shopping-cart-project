import React from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { clearCartRedux } from "../../store/cart";
import "./header.scss";

// TODO: fix header style. should be responsive
const Header = (props) => {
  const { selectedCategory, setSelectedCategory } = props;
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // const { data: categoriesList } = useApi({
  //   url: "https://fakestoreapi.com/products/categories",
  // });
  const categories = ["home", "electronics", "clothing"];
  // categories.push(...categoriesList);
  const selectedItemClass = "header-item header-item-selected";
  const totalCartItems = cartItems.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const handleSelectedCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleClearCart = (event) => {
    dispatch(clearCartRedux());
    event.stopPropagation();
  };

  return (
    <div className="header-container">
      <div className="header-items">
        {categories.map((category) => {
          return (
            <Link
              to={category === "home" ? "" : `category/${category}`}
              key={category}
              className={
                selectedCategory === category
                  ? selectedItemClass
                  : "header-item"
              }
              onClick={() => handleSelectedCategory(category)}
            >
              {category}
            </Link>
          );
        })}
        <Link
          to={"signup"}
          className={
            selectedCategory === "signup" ? selectedItemClass : "header-item"
          }
          onClick={() => handleSelectedCategory("signup")}
        >
          Sign up
        </Link>
        <Link
          to={"login"}
          className={
            selectedCategory === "login" ? selectedItemClass : "header-item"
          }
          onClick={() => handleSelectedCategory("login")}
        >
          Sign in
        </Link>
        <Link
          to={"logout"}
          className={
            selectedCategory === "logout" ? selectedItemClass : "header-item"
          }
          onClick={() => handleSelectedCategory("logout")}
        >
          Logout
        </Link>
      </div>
      <div className="cart-container">
        <i className="fa fa-shopping-cart"></i>
        {totalCartItems > 0 && (
          <>
            <span>{totalCartItems}</span>
            <div className="clear-cart spacing__left" onClick={handleClearCart}>
              Clear Cart
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
