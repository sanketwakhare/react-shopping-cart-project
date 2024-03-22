import _ from "underscore";
import UrlConfig from "../utils/UrlConfig";

const initialState = {
  data: [],
  loading: false,
  loadError: null,
};

// action types
const PRODUCT_LIST_INIT = "PRODUCT_LIST_INIT";
const PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS";
const PRODUCT_LIST_ERROR = "PRODUCT_LIST_ERROR";

// action creators
const initProductList = () => {
  return {
    type: PRODUCT_LIST_INIT,
  };
};

const successProductList = (payload) => {
  return {
    type: PRODUCT_LIST_SUCCESS,
    payload,
  };
};

const errorProductList = (payload) => {
  return {
    type: PRODUCT_LIST_ERROR,
    payload,
  };
};

export const loadProducts = () => {
  return (dispatch) => {
    dispatch(initProductList());
    const url = UrlConfig.ALL_PRODUCTS_URL;
    fetch(url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(successProductList(data.data));
      })
      .catch((err) => {
        dispatch(errorProductList(err));
      });
  };
};

export const searchProducts = (searchParams) => {
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
    // if (!_.isEmpty(param.value) || !_.isUndefined(param.value)) {
    //   paramStringArray.push(`${param.name}=${param.value}`);
    // }
  });
  const paramsString = paramStringArray.join("&");

  return (dispatch) => {
    dispatch(initProductList());
    const url = `${UrlConfig.SEARCH_PRODUCTS_URL}?${paramsString}`;
    fetch(url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(successProductList(data));
      })
      .catch((err) => {
        dispatch(errorProductList(err));
      });
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_INIT: {
      return {
        ...state,
        loading: true,
        data: [],
        loadError: null,
      };
    }
    case PRODUCT_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
        loadError: null,
      };
    }
    case PRODUCT_LIST_ERROR: {
      return {
        ...state,
        loading: false,
        data: [],
        loadError: action.payload,
      };
    }
    default:
      return { ...state };
  }
};

export default reducer;
