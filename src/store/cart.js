// actions
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_SINGLE_ITEM_QUANTITY_FROM_CART =
  "REMOVE_SINGLE_ITEM_QUANTITY_FROM_CART";
const CLEAR_CART = "CLEAR_CART";
const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART";

// action creators
export const addToCartRedux = (payload) => {
  return {
    type: ADD_TO_CART,
    payload,
  };
};

export const removeFromCartRedux = (payload) => {
  return {
    type: REMOVE_SINGLE_ITEM_QUANTITY_FROM_CART,
    payload,
  };
};

export const clearCartRedux = () => {
  return {
    type: CLEAR_CART,
  };
};

export const removeProductFromCartAction = (payload) => {
  return {
    type: REMOVE_PRODUCT_FROM_CART,
    payload,
  };
};

// reducer
const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const product = action.payload;
      let newCartItems = [].concat(state);
      let existingItem = newCartItems.find(
        (item) => item.product._id === product._id,
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        newCartItems.push({ product: product, quantity: 1 });
      }
      return newCartItems;
    }
    case REMOVE_SINGLE_ITEM_QUANTITY_FROM_CART: {
      const product = action.payload;
      let newCartItems = [].concat(state);
      let existingItem = newCartItems.find(
        (item) => item.product._id === product._id,
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
        } else {
          newCartItems = newCartItems.filter(
            (item) => item.product._id !== product._id,
          );
        }
      }
      return newCartItems;
    }
    case CLEAR_CART: {
      return [...initialState];
    }
    case REMOVE_PRODUCT_FROM_CART: {
      const productId = action.payload;
      let newCartItems = [].concat(state);
      let existingItem = newCartItems.find(
        (item) => item.product._id === productId,
      );
      if (existingItem) {
        newCartItems = newCartItems.filter(
          (item) => item.product._id !== productId,
        );
      }
      return newCartItems;
    }
    default:
      return state;
  }
};

export default reducer;
