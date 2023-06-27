import React, { useEffect, useState } from 'react';
import Product from './Product';
import useApi from '../hooks/useApi';

const ProductList = (props) => {
  const { selectedCategory } = props;
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState();

  const { data, loading, loadError } = useApi({
    url: `https://fakestoreapi.com/products/category/${selectedCategory}`,
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

  if (loading === true) return <div className="center">Fetching Products</div>;

  return (
    <div className="products">
      {data.map((product) => {
        return <Product key={product.id} product={product} />;
      })}
    </div>
  );
};

export default ProductList;
