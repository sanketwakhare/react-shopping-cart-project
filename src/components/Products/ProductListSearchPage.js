import React, { useEffect } from "react";
import Product from "./Product";
import ProductListLoader from "./ProductListLoader";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { searchProducts } from "../../store/product-list";
import NoItemsOverlay from "../NoItemsOverlay/NoItemsOverlay";
import "./product-list.scss";

const ProductListSearchPage = () => {
  // read url params
  const params = useParams();
  let categoryFilter = null;
  if (params?.categoryId) {
    categoryFilter = {
      category: params.categoryId ?? "",
    };
  }

  // read location state
  const location = useLocation();
  const { searchString = "" } = location?.state ?? {};

  const dispatch = useDispatch();
  const { loading, loadError, data } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    let filters = { ...categoryFilter };
    const searchParams = {
      freeTextPhrase: searchString,
      filter: filters,
    };
    dispatch(searchProducts(searchParams));
  }, [searchString, location]);

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
