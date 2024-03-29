const initialState = {
  user: null,
  isLoggedIn: false,
  auth: {
    token: null,
    expiry: null,
  },
};

// action types
const STORE_AUTH_USER = "STORE_AUTH_USER";
const CLEAR_AUTH_USER = "CLEAR_AUTH_USER";

// action creators
export const clearAuthAction = () => {
  return {
    type: CLEAR_AUTH_USER,
  };
};

export const storeAuthAction = (payload) => {
  return {
    type: STORE_AUTH_USER,
    payload,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_AUTH_USER: {
      const newState = action.payload ?? {};
      const mergedState = {
        ...state, // Spread the key-value pairs of the 'state' object
        ...newState, // Spread the key-value pairs of the 'newState' object
      };
      return mergedState;
    }
    case CLEAR_AUTH_USER: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};

export default reducer;
