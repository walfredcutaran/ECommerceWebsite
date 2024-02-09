import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productReducer } from './reducers/productReducers';

const rootReducer = combineReducers({
  products: productReducer,
});

// Ensure reducer is assigned rootReducer
const reducer = rootReducer;

let initialState = {};

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
