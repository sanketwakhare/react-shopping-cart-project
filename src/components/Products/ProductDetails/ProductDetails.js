import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../../../hooks/useApi';
import ProductDetailsLoader from './ProductDetailsLoader';

import CartContext from '../../../context/CartContext';

import './product-details.scss';

const ProductDetails = () => {
  const { productId } = useParams();

  const { cartItems, setCartItems } = useContext(CartContext);

  const handleAddToCart = (currProduct) => {
    setCartItems((prevItems) => {
      let newCartItems = [...prevItems];
      newCartItems.push(currProduct);
      return newCartItems;
    });
  };

  const {
    data: product,
    loading,
    loadError,
  } = useApi({
    url: `https://fakestoreapi.com/products/${productId}`,
  });

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
            <button onClick={() => handleAddToCart(product)}>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
