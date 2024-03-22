import React, { useEffect, useState } from "react";
import Product from "./Product";
import ProductListLoader from "./ProductListLoader";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { searchProducts } from "../../store/product-list";
import NoItemsOverlay from "../NoItemsOverlay/NoItemsOverlay";
import "./product-list.scss";

const selectFields = [
  "_id",
  "title",
  "price",
  "description",
  "category",
  "image",
];

const defaultSearchOptions = {
  page: 1,
  limit: 10,
  sort: undefined,
  order: "asc",
  freeTextPhrase: "",
  filter: undefined,
};

const ProductListSearchPage = (props) => {
  const {
    page = defaultSearchOptions.page,
    limit = defaultSearchOptions.limit,
    sort = defaultSearchOptions.sort,
    order = defaultSearchOptions.order,
  } = props;

  const [currLimit, setCurrLimit] = useState(limit);
  const [currentPage, setCurrentPage] = useState(page);

  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const { loading, loadError, data } = useSelector(
    (state) => state.productList
  );
  const { data: prodData, totalCount } = data;
  const totalPages = Math.round(Math.ceil(totalCount / currLimit));

  useEffect(() => {
    setCurrentPage(1);
    setCurrLimit(limit);
  }, [location]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    // read url params
    let categoryFilter = null;
    if (params?.categoryId) {
      categoryFilter = {
        category: params.categoryId ?? "",
      };
    }

    // read location state
    const { searchString } = location?.state ?? {};

    let filters = { ...categoryFilter };
    const searchParams = {
      ...defaultSearchOptions,
      freeTextPhrase: searchString,
      filter: filters,
      select: selectFields,
      page: currentPage,
      limit: currLimit,
      sort,
      order,
    };
    dispatch(searchProducts(searchParams));
  }, [location, currentPage]);

  if (loading === true) return <ProductListLoader cardCount={12} />;

  if (loadError === true) {
    return <div className="no-items-overlay">Oops. Something went wrong</div>;
  }

  return (
    <div className="products-container">
      <div className="products">
        {prodData?.length > 0 &&
          prodData?.map((product) => {
            return <Product key={product._id} product={product} />;
          })}
      </div>
      <div className="pagination-controls">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      {prodData?.length === 0 && <NoItemsOverlay />}
    </div>
  );
};

export default ProductListSearchPage;
