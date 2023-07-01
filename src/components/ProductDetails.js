import React from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';

const ProductDetails = () => {
  const { productId } = useParams();
  const { data: product } = useApi({
    url: `https://fakestoreapi.com/products/${productId}`,
  });

  return <div>Product Details Page {product.title}</div>;
};

export default ProductDetails;
