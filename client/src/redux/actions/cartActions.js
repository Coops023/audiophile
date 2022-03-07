import * as actionTypes from "../constants/cartConstants";
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`${baseUrl}/product/${id}`);
  console.log("add to cart data", data);
  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      product: data.item._id,
      name: data.item.name,
      image: data.item.image.mobile,
      price: data.item.price,
      qty,
    },
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: id,
  });
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};
