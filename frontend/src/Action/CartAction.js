export const ADD_TO_CART = "ADD_TO_CART";
export const CART_CLEAR_ITEMS = "CART_CLEAR_ITEMS";
export const addToCart = (product) => (dispatch, getState) => {
  dispatch({ type: ADD_TO_CART, payload: { product } });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
