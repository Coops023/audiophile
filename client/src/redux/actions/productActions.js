import * as actionTypes from "../constants/productConstants";
import axios from "axios";
import { useParams } from "react-router-dom";

const baseUrl = process.env.REACT_APP_API_URL;

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST });
    const { data } = await axios.get(`${baseUrl}/all-products`);
    console.log("line 10 actions", data);

    dispatch({
      type: actionTypes.GET_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getHeaphones = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_HEADPHONES_REQUEST });
    const { data } = await axios.get(`${baseUrl}/all-headphones`);

    dispatch({
      type: actionTypes.GET_HEADPHONES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_HEADPHONES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getEarphones = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_EARPHONES_REQUEST });
    const { data } = await axios.get(`${baseUrl}/all-earphones`);
    console.log("line 10 actions", data);

    dispatch({
      type: actionTypes.GET_EARPHONES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_EARPHONES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSpeakers = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_SPEAKERS_REQUEST });
    const { data } = await axios.get(`${baseUrl}/all-speakers`);
    console.log("line 10 actions", data);

    dispatch({
      type: actionTypes.GET_SPEAKERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_SPEAKERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`${baseUrl}/product/${id}`);

    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeProductDetails = () => (dispatch) => {
  dispatch({
    type: actionTypes.GET_PRODUCT_DETAILS_RESET,
  });
};
