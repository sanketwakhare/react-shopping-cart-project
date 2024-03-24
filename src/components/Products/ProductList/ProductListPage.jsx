
import NoItemsOverlay from "components/NoItemsOverlay/NoItemsOverlay";
import useApi from "hooks/useApi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router";
import {
  errorProductList,
  initProductList,
  successProductList,
} from "store/product-list";
import Pagination from "ui-components/Pagination/Pagination";
import _ from "underscore";
import UrlConfig from "utils/UrlConfig";

import Product from "./Product";
import ProductListLoader from "./ProductListLoader";
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

const ProductListPage = (props) => {
  const {
    page = defaultSearchOptions.page,
    limit = defaultSearchOptions.limit,
    sort = defaultSearchOptions.sort,
    order = defaultSearchOptions.order,
  } = props;

  const [currLimit, setCurrLimit] = useState(limit);
  const [currentPage, setCurrentPage] = useState({
    page: -1,
    counter: 0,
  });
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const { data, loading, loadError, request } = useApi();
  const { data: prodData, totalCount } = data;

  useEffect(() => {}, []);

  useEffect(() => {
    onPageChange(1);
  }, [location]);

  const onPageChange = (page) => {
    setCurrentPage((prev) => {
      return {
        page: page,
        counter: prev.counter + 1,
      };
    });
  };

  const getInputParams = () => {
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
      page: currentPage?.page,
      limit: currLimit,
      sort,
      order,
    };
    return searchParams;
  };

  const buildSearchQueryParams = (searchParams) => {
    if (!searchParams) return;

    const { filter, freeTextPhrase, select, page, limit, sort, order } =
      searchParams;

    // convert filter object to string
    const filterString = !_.isEmpty(filter) ? JSON.stringify(filter) : "";

    // build request params
    const params = [
      { name: "filter", value: filterString },
      { name: "freeTextPhrase", value: freeTextPhrase },
      { name: "select", value: (select ?? []).join(" ") },
      { name: "page", value: page ?? 1 },
      { name: "limit", value: limit ?? 10 },
      { name: "sort", value: sort },
      { name: "order", value: order },
    ];
    const paramStringArray = [];
    params.forEach((param) => {
      if (
        _.isArray(param.value) ||
        _.isObject(param.value) ||
        !_.isEmpty(param.value)
      ) {
        paramStringArray.push(`${param.name}=${param.value}`);
      } else if (
        !_.isNull(param.value) &&
        !_.isUndefined(param.value) &&
        param.value !== ""
      ) {
        paramStringArray.push(`${param.name}=${param.value}`);
      }
    });
    return paramStringArray.join("&");
  };

  const fetchProducts = async (queryParams) => {
    try {
      const response = await request(
        `${UrlConfig.SEARCH_PRODUCTS_URL}?${queryParams}`
      );
      const { loading, loadError, data } = response;
      if (loading === true) {
        dispatch(initProductList());
      } else if (loading === false && loadError) {
        dispatch(errorProductList(loadError));
      } else if (loading === false && !loadError) {
        dispatch(successProductList(data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const searchProducts = async () => {
    const searchParams = getInputParams();
    const queryParams = buildSearchQueryParams(searchParams);
    if (searchParams) {
      await fetchProducts(queryParams);
    }
  };

  useEffect(() => {
    if (currentPage.page !== -1) {
      searchProducts();
    }
  }, [currentPage]);

  if (loading === true) return <ProductListLoader cardCount={10} />;

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
      <Pagination
        page={currentPage?.page}
        totalCount={totalCount}
        limit={currLimit}
        onPageChangeCb={onPageChange}
      />
      {prodData?.length === 0 && <NoItemsOverlay />}
    </div>
  );
};

export default ProductListPage;
