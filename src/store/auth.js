const initialState = {
  user: null,
  isLoggedIn: false,
  auth: {
    token: null,
    expiry: null
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
        ...action?.payload,
        // user: action?.payload?.user ?? state.user,
        // isLoggedIn: action?.payload?.isLoggedIn ?? state.isLoggedIn,
        // token: action?.payload?.token ?? state.token,
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
