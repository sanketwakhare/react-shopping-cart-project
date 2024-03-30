const { REACT_APP_BASE_URL } = process.env;

const UrlConfig = {
  // auth
  SIGN_UP_URL: REACT_APP_BASE_URL + "/api/auth/signup",
  LOGIN_URL: REACT_APP_BASE_URL + "/api/auth/login",
  LOGOUT_URL: REACT_APP_BASE_URL + "/api/auth/logout",
  VERIFY_TOKEN_URL: REACT_APP_BASE_URL + "/api/auth/verifyToken",
  REFRESH_TOKEN_URL: REACT_APP_BASE_URL + "/api/auth/refresh-token",

  // forgot password
  FORGOT_PASSWORD_URL: REACT_APP_BASE_URL + "/api/auth/forgotPassword",
  VALIDATE_OTP_URL: REACT_APP_BASE_URL + "/api/auth/validateOtp/:userId",
  RESET_PASSWORD_URL: REACT_APP_BASE_URL + "/api/auth/resetPassword/:userId",

  // products
  ALL_PRODUCTS_URL: REACT_APP_BASE_URL + "/api/products",
  SEARCH_PRODUCTS_URL: REACT_APP_BASE_URL + "/api/products/search",
  PRODUCT_BY_ID_URL: REACT_APP_BASE_URL + "/api/products/:productId",

  // user
  USER_PROFILE_URL: REACT_APP_BASE_URL + "/api/users/me",
  UPDATE_USER_PROFILE_URL: REACT_APP_BASE_URL + "/api/users/update-profile",

  // orders
  CREATE_ORDER_URL: REACT_APP_BASE_URL + "/api/orders",
  USER_ORDERS_URL: REACT_APP_BASE_URL + "/api/orders/user-orders",
  UPDATE_ORDER_STATUS_URL: REACT_APP_BASE_URL + "/api/orders/:orderId",
  GET_ORDER_DETAILS_URL: REACT_APP_BASE_URL + "/api/orders/:orderId",

  // payments
  CREATE_PAYMENT_ORDER_URL:
    REACT_APP_BASE_URL + "/api/payments/create-payment-order",
  VERIFY_PAYMENT_SIGNATURE_URL:
    REACT_APP_BASE_URL + "/api/payments/verify-payment-signature",
  CAPTURE_PAYMENT_TXN_URL:
    REACT_APP_BASE_URL + "/api/payments/capture-payment-transaction",
  GET_PAYMENT_TXN_BY_ORDER_ID_URL:
    REACT_APP_BASE_URL +
    "/api/payments/get-payment-transactions-for-order/:orderId",
  UPDATE_PAYMENT_TXN_BY_TXN_ORDER_ID_URL:
    REACT_APP_BASE_URL + "/api/payments/update-payment-transaction/:txnOrderId",
};

export default UrlConfig;
