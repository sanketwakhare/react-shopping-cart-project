import { createStore, combineReducers } from 'redux';

import cartReducer from './cart';

const reducer = combineReducers({
    cart: cartReducer,
    // productList: productListReducer
});

const store = createStore(reducer);

export default store;