import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productsReducer, productDetailsReducer, suggestedProductsReducer } from './reducers/productReducers';

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  suggestedProducts: suggestedProductsReducer
});



let initialState = {};

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
