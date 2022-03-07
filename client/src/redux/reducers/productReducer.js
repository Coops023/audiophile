import * as actionTypes from "../constants/productConstants";

export const getProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case actionTypes.GET_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getHeadphonesReducer = (state = { headphones: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_HEADPHONES_REQUEST:
      return {
        loading: true,
        headphones: [],
      };
    case actionTypes.GET_HEADPHONES_SUCCESS:
      return {
        loading: false,
        headphones: action.payload,
      };
    case actionTypes.GET_HEADPHONES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getEarphonesReducer = (state = { earphones: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_EARPHONES_REQUEST:
      return {
        loading: true,
        earphones: [],
      };
    case actionTypes.GET_EARPHONES_SUCCESS:
      return {
        loading: false,
        earphones: action.payload,
      };
    case actionTypes.GET_EARPHONES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getSpeakersReducer = (state = { speakers: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_SPEAKERS_REQUEST:
      return {
        loading: true,
        speakers: [],
      };
    case actionTypes.GET_SPEAKERS_SUCCESS:
      return {
        loading: false,
        speakers: action.payload,
      };
    case actionTypes.GET_SPEAKERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getProductDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
      return {
        laoding: true,
      };
    case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case actionTypes.GET_PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.GET_PRODUCT_DETAILS_RESET:
      return {
        product: {},
      };
    default:
      return state;
  }
};
