import React, { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';

const Header = (props) => {
  const { selectedCategory, setSelectedCategory } = props;
  // const [data, setData] = useState([]);

  const { data } = useApi({
    url: 'https://fakestoreapi.com/products/categories',
  });

  // useEffect(() => {
  // fetch('https://fakestoreapi.com/products/categories')
  //   .then((res) => res.json())
  //   .then((json) => setData(json));
  // }, []);

  const handleSelectedCategory = (category) => {
    console.log(category);
    setSelectedCategory(category);
  };

  const selectedItemClass = 'header-item header-item-seelcted';

  return (
    <div className="header-items">
      {data.map((category) => {
        return (
          <div
            key={category}
            className={
              selectedCategory === category ? selectedItemClass : 'header-item'
            }
            onClick={() => handleSelectedCategory(category)}
          >
            {category}
          </div>
        );
      })}
    </div>
  );
};

export default Header;
