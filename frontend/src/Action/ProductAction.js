// actions/productActions.js
import axios from "axios";
import { getError } from "../utils";

export const FETCH_REQUEST = "FETCH_REQUEST";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAIL = "FETCH_FAIL";

export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: FETCH_REQUEST });
  try {
    const res = await axios.get("/api/products");
    dispatch({ type: FETCH_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: FETCH_FAIL, payload: getError(error) });
    console.error("Error fetching data:", error);
  }
};
