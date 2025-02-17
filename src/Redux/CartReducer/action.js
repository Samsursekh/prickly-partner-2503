import * as types from "./actionTypes";
import axios from "axios";

export const getCartData = () => (dispatch) => {
  dispatch({ type: types.GET_CARTDATA_REQUEST });
  return axios
    .get("https://jiomart-data.onrender.com/Cart")
    .then((res) => {
      console.log("GetRes:", res);
      return dispatch({ type: types.GET_CARTDATA_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      return dispatch({ type: types.GET_CARTDATA_FAILURE });
    });
};

export const addCartData = (payload) => (dispatch) => {
  dispatch({ type: types.ADD_CARTDATA_REQUEST });
  return axios
    .post(`https://jiomart-data.onrender.com/Cart`, payload)
    .then((res) => {
      console.log("AddRes:", res);
      return dispatch({ type: types.ADD_CARTDATA_SUCCESS, payload: res.data });
    })
    .then(() => getCartData())
    .catch((err) => {
      return dispatch({ type: types.ADD_CARTDATA_FAILURE });
    });
};

export const updateCartData = (id, payload) => (dispatch) => {
  dispatch({ type: types.UPDATE_CARTDATA_REQUEST });
  return axios
    .patch(
      `https://jiomart-data.onrender.com/Cart/${id}`,
      payload
    )
    .then((res) => {
      console.log("UpdateRes:", res);
      axios
        .get("https://jiomart-data.onrender.com/Cart")
        .then((res) => {
          console.log("InnerRes:", res);
          return dispatch({
            type: types.UPDATE_CARTDATA_SUCCESS,
            payload: res.data,
          });
        });
    })
    .then(() => getCartData())
    .catch((err) => {
      return dispatch({ type: types.UPDATE_CARTDATA_FAILURE });
    });
};

export const deleteCartData = (payload) => (dispatch) => {
  dispatch({ type: types.DELETE_CARTDATA_REQUEST });
  return axios
    .delete(
      `https://jiomart-data.onrender.com/Cart/${payload.id}`,
      payload
    )
    .then((res) => {
      console.log("deleteRes:", res);
      axios
        .get("https://jiomart-data.onrender.com/Cart")
        .then((res) => {
          return dispatch({
            type: types.DELETE_CARTDATA_SUCCESS,
            payload: res.data,
          });
        });
    })
    .catch((err) => {
      return dispatch({ type: types.DELETE_CARTDATA_FAILURE });
    });
};