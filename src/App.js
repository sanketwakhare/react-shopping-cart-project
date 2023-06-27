import React, { useState } from 'react';
import './style.css';

import Header from './components/Header';
import ProductList from './components/ProductList';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState();

  return (
    <div>
      <Header
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ProductList selectedCategory={selectedCategory} />
    </div>
  );
}
