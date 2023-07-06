import React from 'react';
import './add-to-cart.scss';
import { useSelector, useDispatch } from 'react-redux';

import { addToCartRedux, removeFromCartRedux } from '../../store/cart';

const AddToCart = (props) => {

  const { product } = props;
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const isProductPresentInCart = cartItems.find(
    (item) => item.product.id === product.id
  );

  const handleAddToCart = (event) => {
    dispatch(addToCartRedux(product));
    event.stopPropagation();
  };

  const handleRemoveFromCart = (event) => {
    dispatch(removeFromCartRedux(product));
    event.stopPropagation();
  };

  return (
    <div className="add-to-cart-container">
      {isProductPresentInCart && (
        <>
          <button onClick={handleRemoveFromCart}>-</button>
          <span className="spacing__quantity">
            {isProductPresentInCart.quantity}
          </span>
          <button onClick={handleAddToCart}>+</button>
        </>
      )}
      {!isProductPresentInCart && (
        <button onClick={handleAddToCart}>Add To Cart</button>
      )}
    </div>
  );
};

export default AddToCart;
