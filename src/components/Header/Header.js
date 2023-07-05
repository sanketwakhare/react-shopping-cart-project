import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import useApi from '../../hooks/useApi';

import { useCartContext } from '../../context/CartContext';
import './header.scss';

const Header = (props) => {
  const { selectedCategory, setSelectedCategory } = props;

  const { cartItems, clearCart } = useCartContext();

  const { data: categoriesList } = useApi({
    url: 'https://fakestoreapi.com/products/categories',
  });

  const handleSelectedCategory = (category) => {
    setSelectedCategory(category);
  };

  let categories = ['home'];
  categories.push(...categoriesList);

  const selectedItemClass = 'header-item header-item-selected';
  const totalCartItems = cartItems.reduce((acc, item) => {
    return acc + item.quantity
  }, 0);

  return (
    <div className="header-container">
      <div className="header-items">
        {categories.map((category) => {
          return (
            <Link
              to={category === 'home' ? '' : `category/${category}`}
              key={category}
              className={
                selectedCategory === category
                  ? selectedItemClass
                  : 'header-item'
              }
              onClick={() => handleSelectedCategory(category)}
            >
              {category}
            </Link>
          );
        })}
      </div>
      <div className="cart-container">
        <i className="fa fa-shopping-cart"></i>
        {totalCartItems > 0 &&
          <>
            <span>{totalCartItems}</span>
            <div className="clear-cart spacing__left" onClick={() => clearCart()}>Clear Cart</div>
          </>}

      </div>
    </div>
  );
};

export default Header;
