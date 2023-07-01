import React from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';
import ProductDetailsLoader from '../components/Loader/ProductDetailsLoader';

import './product-details.scss';

const ProductDetails = () => {
  const { productId } = useParams();
  const {
    data: product,
    loading,
    loadError,
  } = useApi({
    url: `https://fakestoreapi.com/products/${productId}`,
  });

  if (loading === true)
    return (
      <div className="center">
        <ProductDetailsLoader cardCount={1} />
      </div>
    );

  return (
    <div className="product-details-container">
      <div className="product-details">
        <img src={product.image} alt="product"></img>
        <div className="product-details__container">
          <div className="product-details__title">
            <div>{product.title}</div>
          </div>
          <div className="product-details__price">
            {/* <label>Price:</label> */}
            <span>{product.price}</span>
          </div>
          <div className="product-details__description">
            <label>Description:</label>
            <p>{product.description}</p>
          </div>
          <div className="product-details__category">
            <label>Category:</label>
            <span>{product.category}</span>
          </div>
          <div className="product-details__ratings">
            <label>Ratings:</label>
            <span>{product.rating?.rate}</span>
            {/* <span>{product.rating?.count}</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
