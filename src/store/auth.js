const initialState = {
  user: null,
  isLoggedIn: false,
  token: null,
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

// export const storeAuthUserInfo = (payload) => {
//   return (dispatch) => {
//     dispatch(storeAuthAction(payload));
//   };
// };

// export const clearAuthUserInfo = () => {
//   return (dispatch) => {
//     dispatch(clearAuthAction());
//   };
// };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_AUTH_USER: {
      return {
        ...state,
        user: action?.payload?.user,
        isLoggedIn: action?.payload?.isLoggedIn,
        token: action?.payload?.token,
      };
    }
    case CLEAR_AUTH_USER: {
      return {
        ...state,
        ...initialState,
      };
    }
    default:
      return state;
  }
};

export default reducer;
