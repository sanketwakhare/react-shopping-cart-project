import React from "react";
import { Link } from "react-router-dom";

import AddToCart from "../AddToCart/AddToCart";

const Product = (props) => {
  const { product } = props;

  return (
    <div className="product">
      <Link to={`/products/${product._id}`}>
        <img src={product.image}></img>
      </Link>
      <div className="product-info">
        <div className="product-title ellipsis-2-lines">
          {product.title}
          <span className="tooltip-text">{product.title}</span>
        </div>
        <div className="product-actions">
          <div className="product-price">₹ {product.price}</div>
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  );
};

export default Product;
