import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useApi from '../hooks/useApi';

const Header = (props) => {
  const { selectedCategory, setSelectedCategory } = props;
  const { data: categoriesList } = useApi({
    url: 'https://fakestoreapi.com/products/categories',
  });

  const handleSelectedCategory = (category) => {
    setSelectedCategory(category);
  };
  let categories = ['home'];
  categories.push(...categoriesList);

  const selectedItemClass = 'header-item header-item-seelcted';

  return (
    <div className="header-items">
      {categories.map((category) => {
        return (
          <Link
            to={category === 'home' ? '' : `category/${category}`}
            key={category}
            className={
              selectedCategory === category ? selectedItemClass : 'header-item'
            }
            onClick={() => handleSelectedCategory(category)}
          >
            {category}
          </Link>
        );
      })}
    </div>
  );
};

export default Header;
