import React from 'react';
import { Link } from 'react-router-dom';

const Product = (props) => {
  const { product } = props;
  return (
    <Link to={`/products/${product.id}`} className="product">
      <img src={product.image}></img>
      <div className="prouct-details-container">
        <div className="product-title">{product.title}</div>
        <div className="product-price">$ {product.price}</div>
      </div>
    </Link>
  );
};

export default Product;
