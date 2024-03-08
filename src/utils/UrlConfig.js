const { REACT_APP_BASE_URL } = process.env;

const UrlConfig = {
  // auth
  SIGN_UP_URL: REACT_APP_BASE_URL + "/api/auth/signup",
  LOGIN_URL: REACT_APP_BASE_URL + "/api/auth/login",
  LOGOUT_URL: REACT_APP_BASE_URL + "/api/auth/logout",
  VERIFY_TOKEN_URL: REACT_APP_BASE_URL + "/api/auth/verifyToken",

  // products
  ALL_PRODUCTS_URL: REACT_APP_BASE_URL + "/api/products",
  SEARCH_PRODUCTS_URL: REACT_APP_BASE_URL + "/api/products/search",
  PRODUCT_BY_ID_URL: REACT_APP_BASE_URL + "/api/products",
};

export default UrlConfig;
