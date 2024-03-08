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

export const loadProducts = (category) => {
  return (dispatch) => {
    dispatch(initProductList());
    const allProductsApiURL = UrlConfig.ALL_PRODUCTS_URL;
    const categoryWiseProductsApiURL = `${UrlConfig.SEARCH_PRODUCTS_URL}?filter={"category": "${category}"}`;
    const url =
      category === "home" ? allProductsApiURL : categoryWiseProductsApiURL;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        dispatch(successProductList(data.data));
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
