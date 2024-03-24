import { applyMiddleware, combineReducers, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunk from "redux-thunk";
import authReducer from "store/auth";
import cartReducer from "store/cart";
import productListReducer from "store/product-list";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  cart: cartReducer,
  productList: productListReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);

export const clearPersistedState = () => {
  persistor.purge();
};

export default store;
