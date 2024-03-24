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
export const initProductList = () => {
  return {
    type: PRODUCT_LIST_INIT,
  };
};

export const successProductList = (payload) => {
  return {
    type: PRODUCT_LIST_SUCCESS,
    payload,
  };
};

export const errorProductList = (payload) => {
  return {
    type: PRODUCT_LIST_ERROR,
    payload,
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
