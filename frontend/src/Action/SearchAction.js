import axios from "axios";

export const SET_SEARCH_FILTERS = "SET_SEARCH_FILTERS";
export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";
export const SEARCH_PRODUCTS_SUCCESS = "SEARCH_PRODUCTS_SUCCESS";
export const SEARCH_PRODUCTS_FAILURE = "SEARCH_PRODUCTS_FAILURE";

export const searchfetchProducts = (filters) => async (dispatch) => {
  dispatch({ type: "SET_SEARCH_FILTERS", payload: filters });
  dispatch({ type: "SEARCH_PRODUCTS" });

  const { category, query, price, rating, order, page } = filters;

  try {
    const { data } = await axios.get(
      `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
    );

    dispatch({
      type: "SEARCH_PRODUCTS_SUCCESS",
      payload: {
        products: data.products,
        countProducts: data.countProducts,
        page: data.page,
        totalPages: data.pages,
      },
    });
  } catch (err) {
    dispatch({ type: "SEARCH_PRODUCTS_FAILURE", payload: err.message });
  }
};
