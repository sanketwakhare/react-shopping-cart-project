import React, { useEffect } from "react";
import Product from "./Product";
import ProductListLoader from "./ProductListLoader";

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { searchProducts } from "../../store/product-list";
import NoItemsOverlay from "../NoItemsOverlay/NoItemsOverlay";
import "./product-list.scss";

const ProductListSearchPage = (props) => {
  const location = useLocation();
  const { searchString } = location?.state;

  const dispatch = useDispatch();
  const { loading, loadError, data } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(searchProducts(searchString));
  }, [searchString]);

  if (loading === true) return <ProductListLoader cardCount={12} />;

  if (loadError === true) {
    return <div className="no-items-overlay">Oops. Something went wrong</div>;
  }

  return (
    <>
      {data?.length > 0 && (
        <div className="products">
          {data?.map((product) => {
            return <Product key={product._id} product={product} />;
          })}
        </div>
      )}
      {data?.length === 0 && <NoItemsOverlay />}
    </>
  );
};

export default ProductListSearchPage;
