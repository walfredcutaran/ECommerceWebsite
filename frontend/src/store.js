import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';

import { productsReducer, productDetailsReducer, suggestedProductsReducer } from './reducers/productReducers';

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  suggestedProducts: suggestedProductsReducer
});


let initialState = {};
const middleware = [thunk];
const store = createStore(reducer, initialState, compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f));
  
export default store;