import React from 'react';
import { Link } from 'react-router-dom';

const Product = (props) => {
  const { product } = props;

  const handleAddToCart = (currProduct) => {
    console.log(currProduct);
  };

  return (
    <div className="product">
      <Link to={`/products/${product.id}`}>
        <img src={product.image}></img>
      </Link>
      <div className="prouct-info">
        <div className="product-title">{product.title}</div>
        <div className="product-actions">
          <div className="product-price">$ {product.price}</div>
          <button onClick={() => handleAddToCart(product)}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
