import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../../../hooks/useApi';
import ProductDetailsLoader from './ProductDetailsLoader';

import { useCartContext } from '../../../context/CartContext';

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
  const { cartItems, addItemToCart, removeItemFromCart } = useCartContext();

  const isProductPresentInCart = cartItems.find(item => item.product.id === product.id);

  if (loading === true)
    return (
      <div className="main-container">
        <ProductDetailsLoader />
      </div>
    );

  if (loadError === true) {
    return <div className="no-items-overlay">Opps. Somehing went wrong</div>;
  }

  return (
    <div className="product-details-container">
      <div className="product-details">
        <img src={product.image} alt="product"></img>
        <div className="product-details__container">
          <div className="product-details__title">
            <div>{product.title}</div>
          </div>
          <div className="product-details__price">
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
          </div>
          <div className="product-actions">
            {isProductPresentInCart &&
              <div>
                <button onClick={() => removeItemFromCart(product)}>-</button>
                <span className="spacing__quantity">{isProductPresentInCart.quantity}</span>
                <button onClick={() => addItemToCart(product)}>+</button>
              </div>}
            {!isProductPresentInCart &&
              <button onClick={() => addItemToCart(product)}>Add To Cart</button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
