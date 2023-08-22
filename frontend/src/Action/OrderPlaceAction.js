import axios from "axios";

export const FETCH_ORDERS_REQUEST = "FETCH_ORDERS_REQUEST";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_FAILURE = "FETCH_ORDERS_FAILURE";

// Action Creators
export const fetchOrders = (userId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ORDERS_REQUEST });

    const response = await axios.get(`/api/user/order/${userId}`);
    const ordersDetails = response.data;

    dispatch({
      type: FETCH_ORDERS_SUCCESS,
      payload: ordersDetails,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ORDERS_FAILURE,
      payload: error.message || "An error occurred while fetching orders.",
    });
  }
};
