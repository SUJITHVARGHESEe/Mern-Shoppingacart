export const UPDATE_QUANTITY = "UPDATE_QUANTITY";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";

export const updateQuantity = (item, newQuantity) => (dispatch, getState) => {
  const updatedItem = { ...item, quantity: newQuantity };
  dispatch({ type: UPDATE_QUANTITY, payload: updatedItem });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeProduct = (item) => (dispatch, getState) => {
  const updatedCartItems = getState().cart.cartItems.filter(
    (cartItem) => cartItem.slug !== item.slug
  );
  dispatch({ type: REMOVE_PRODUCT, payload: updatedCartItems });
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems)); // Update local storage
};
