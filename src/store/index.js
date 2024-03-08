import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import cartReducer from "./cart";
import productListReducer from "./product-list";

const reducer = combineReducers({
  cart: cartReducer,
  productList: productListReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
