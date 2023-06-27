import React from 'react';

const Product = (props) => {
  const { product } = props;
  return (
    <div className="product">
      <img src={product.image}></img>
      <div>
        <div>{product.title}</div>
        <span>$ {product.price}</span>
      </div>
    </div>
  );
};

export default Product;
