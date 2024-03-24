import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../../hooks/useApi";

import AddToCart from "../../AddToCart/AddToCart";
import ProductDetailsLoader from "./ProductDetailsLoader.jsx";

import UrlConfig from "../../../utils/UrlConfig";
import { formatPrice } from "../../../utils/Utils.js";
import "./product-details.scss";

const ProductDetails = () => {
  const { productId } = useParams();
  const { data, loading, loadError, request } = useApi();

  const product = data?.data;

  const getProductDetails = async () => {
    try {
      await request(
        UrlConfig.PRODUCT_BY_ID_URL.replace(":productId", productId)
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  if (loading === true)
    return (
      <div className="main-container">
        <ProductDetailsLoader />
      </div>
    );

  if (loadError === true) {
    return <div className="no-items-overlay">Oops. Something went wrong</div>;
  }

  return (
    <div className="product-details-container">
      <div className="product-details">
        <img src={product?.image} alt="product"></img>
        <div className="product-details__container">
          <div className="product-details__title">
            <div>{product?.title}</div>
          </div>
          <div className="product-details__price">
            {/* <span>₹ {product?.price}</span> */}
            <span className="currency">₹</span>
            <span className="price-value">{formatPrice(product?.price)}</span>
          </div>
          <div className="product-details__description">
            <label>Description:</label>
            <p>{product?.description}</p>
          </div>
          <div className="product-details__category">
            <label>Category:</label>
            <span>{product?.category}</span>
          </div>
          <div className="product-details__ratings">
            <label>Ratings:</label>
            <span>{product?.rating?.rate}</span>
          </div>
          <div className="product-actions">
            <AddToCart product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
