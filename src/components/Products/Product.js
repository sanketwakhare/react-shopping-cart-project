import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

import CartContext, { useCartContext } from '../../context/CartContext';

const Product = (props) => {
  const { product } = props;
  const { cartItems, addItemToCart, removeItemFromCart } = useCartContext();
  const isProductPresentInCart = cartItems.find(item => item.product.id === product.id);

  return (
    <div className="product">
      <Link to={`/products/${product.id}`}>
        <img src={product.image}></img>
      </Link>
      <div className="product-info">
        <div className="product-title">{product.title}</div>
        <div className="product-actions">
          <div className="product-price">$ {product.price}</div>
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
  );
};

export default Product;
