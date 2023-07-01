import React, { useEffect, useState } from 'react';
import Product from './Product';
import useApi from '../hooks/useApi';
import ProductListLoader from '../components/Loader/ProductListLoader';

const ProductList = (props) => {
  const { selectedCategory } = props;
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState();

  const allProductsApiURL = 'https://fakestoreapi.com/products';
  const categoryWiseProductsApiURL = `https://fakestoreapi.com/products/category/${selectedCategory}`;

  const { data, loading, loadError } = useApi({
    url:
      selectedCategory === 'home'
        ? allProductsApiURL
        : categoryWiseProductsApiURL,
  });

  // useEffect(() => {
  // setLoading(false);
  // fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`)
  //   .then((res) => res.json())
  //   .then((json) => {
  //     setProducts(json);
  //     console.log(json);
  //     setLoading(true);
  //   });
  // }, [selectedCategory]);

  if (loading === true)
    return (
      <div className="center">
        <ProductListLoader cardCount={6} />
      </div>
    );

  return (
    <div className="products">
      {data.map((product) => {
        return <Product key={product.id} product={product} />;
      })}
    </div>
  );
};

export default ProductList;
