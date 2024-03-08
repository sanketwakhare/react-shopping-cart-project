import React, { useEffect } from "react";
import Product from "./Product";
import ProductListLoader from "./ProductListLoader";

import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../../store/product-list";
import NoItemsOverlay from "../NoItemsOverlay/NoItemsOverlay";
import "./product-list.scss";

const ProductList = (props) => {
  const { selectedCategory } = props;
  const dispatch = useDispatch();
  const { loading, loadError, data } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(loadProducts(selectedCategory));
  }, [selectedCategory]);

  if (loading === true)
    return (
      <div className="center">
        <ProductListLoader cardCount={6} />
      </div>
    );

  if (loadError === true) {
    return <div className="no-items-overlay">Oops. Something went wrong</div>;
  }

  return (
    <div className="products">
      {data?.map((product) => {
        return <Product key={product._id} product={product} />;
      })}
      {data?.length === 0 && <NoItemsOverlay />}
    </div>
  );
};

export default ProductList;
