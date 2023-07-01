import React, { useEffect, useState } from 'react';
import Product from './Product';
import useApi from '../../hooks/useApi';
import ProductListLoader from './ProductListLoader';

import './product-list.scss';

const ProductList = (props) => {
  const { selectedCategory } = props;

  const allProductsApiURL = 'https://fakestoreapi.com/products';
  const categoryWiseProductsApiURL = `https://fakestoreapi.com/products/category/${selectedCategory}`;

  const { data, loading, loadError } = useApi({
    url:
      selectedCategory === 'home'
        ? allProductsApiURL
        : categoryWiseProductsApiURL,
  });

  if (loading === true)
    return (
      <div className="center">
        <ProductListLoader cardCount={6} />
      </div>
    );

  if (loadError === true) {
    return <div className="no-items-overlay">Opps. Somehing went wrong</div>;
  }

  return (
    <div className="products">
      {data.map((product) => {
        return <Product key={product.id} product={product} />;
      })}
    </div>
  );
};

export default ProductList;
