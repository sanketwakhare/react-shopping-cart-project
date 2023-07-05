import React from 'react';
import { useCartContext } from '../../context/CartContext';
import './add-to-cart.scss';

const AddToCart = (props) => {
  const { product } = props;
  const { cartItems, addItemToCart, removeItemFromCart } = useCartContext();
  const isProductPresentInCart = cartItems.find(
    (item) => item.product.id === product.id
  );

  return (
    <div className="add-to-cart-container">
      {isProductPresentInCart && (
        <>
          <button onClick={() => removeItemFromCart(product)}>-</button>
          <span className="spacing__quantity">
            {isProductPresentInCart.quantity}
          </span>
          <button onClick={() => addItemToCart(product)}>+</button>
        </>
      )}
      {!isProductPresentInCart && (
        <button onClick={() => addItemToCart(product)}>Add To Cart</button>
      )}
    </div>
  );
};

export default AddToCart;
