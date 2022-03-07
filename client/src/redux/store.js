import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//reducers
import { cartReducer } from "./reducers/cartReducers";
import {
  getSpeakersReducer,
  getEarphonesReducer,
  getHeadphonesReducer,
  getProductDetailsReducer,
  getProductsReducer,
} from "./reducers/productReducer";

const reducer = combineReducers({
  cart: cartReducer,
  getProducts: getProductsReducer,
  getHeadphones: getHeadphonesReducer,
  getEarphones: getEarphonesReducer,
  getSpeakers: getSpeakersReducer,
  getProductDetails: getProductDetailsReducer,
});

const middleware = [thunk];

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
