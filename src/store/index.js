import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "./auth";
import cartReducer from "./cart";
import productListReducer from "./product-list";

const reducer = combineReducers({
  cart: cartReducer,
  productList: productListReducer,
  auth: authReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
