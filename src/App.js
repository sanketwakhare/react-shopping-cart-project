import React, { useState } from 'react';
import './style.scss';
import { Routes, Route } from 'react-router-dom';

import NoItemsOverlay from './components/NoItemsOverlay';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';

import CartContext from './context/CartContext';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('home');

  const [cartItems, setCartItems] = useState([]);

  return (
    <div>
      <CartContext.Provider value={{ cartItems, setCartItems }}>
        <Header
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div className="main-container">
          <Routes>
            <Route
              path=""
              element={<ProductList selectedCategory="home" />}
            ></Route>
            <Route
              path="category/:categoryId"
              element={<ProductList selectedCategory={selectedCategory} />}
            ></Route>
            <Route
              path="products/:productId"
              element={<ProductDetails />}
            ></Route>
            <Route path="*" element={<NoItemsOverlay />}></Route>
          </Routes>
        </div>
      </CartContext.Provider>
    </div>
  );
}
