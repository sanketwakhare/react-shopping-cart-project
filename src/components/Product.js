import React from 'react';

const Product = (props) => {
  const { product } = props;
  return (
    <div className="product">
      <img src={product.image}></img>
      <div className="prouct-details-container">
        <div className="product-title">{product.title}</div>
        <div className="product-price">$ {product.price}</div>
      </div>
    </div>
  );
};

export default Product;
