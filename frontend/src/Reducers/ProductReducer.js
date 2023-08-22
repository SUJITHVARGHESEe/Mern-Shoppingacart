// reducers/productReducer.js
import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
} from "../Action/ProductAction";

const initialState = {
  loading: true,
  error: "",
  products: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return { ...state, loading: true, error: "" };
    case FETCH_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case FETCH_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default productReducer;
