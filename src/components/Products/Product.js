import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

import CartContext from '../../context/CartContext';

const Product = (props) => {
  const { product } = props;

  const { cartItems, setCartItems } = useContext(CartContext);

  const handleAddToCart = (currProduct) => {
    setCartItems((prevItems) => {
      let newCartItems = [...prevItems];
      newCartItems.push(currProduct);
      return newCartItems;
    });
  };

  return (
    <div className="product">
      <Link to={`/products/${product.id}`}>
        <img src={product.image}></img>
      </Link>
      <div className="product-info">
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
