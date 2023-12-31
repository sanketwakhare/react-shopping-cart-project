import React, { useState } from 'react';
import './style.scss';
import { Routes, Route } from 'react-router-dom';

import NoItemsOverlay from './components/NoItemsOverlay/NoItemsOverlay';
import Header from './components/Header/Header';
import ProductList from './components/Products/ProductList';
import ProductDetails from './components/Products/ProductDetails/ProductDetails';

import { Provider } from 'react-redux';
import store from './store';

export default function App() {

  const [selectedCategory, setSelectedCategory] = useState('home');

  return (
    <div>
      {/* redux provider */}
      <Provider store={store}>
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
      </Provider>
    </div>
  );
}
