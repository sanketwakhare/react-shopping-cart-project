import React from "react";
import { Link } from "react-router-dom";

import AddToCart from "../AddToCart/AddToCart";

const Product = (props) => {
  const { product } = props;

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    currency: "INR",
  }).format(product?.price);

  return (
    <div className="product">
      <Link to={`/products/${product._id}`} className="link">
        <img src={product.image}></img>
      </Link>
      <div className="product-info">
        <div className="product-title ellipsis-2-lines">
          <Link to={`/products/${product._id}`}>{product.title}</Link>
          <span className="tooltip-text">{product.title}</span>
        </div>
        <div className="product-actions">
          <div className="product-price">
            <span className="currency">₹</span>
            <span className="price-value">{formattedPrice}</span>
          </div>
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  );
};

export default Product;
