export const ADD_ADDRESS = "ADD_ADDRESS";

export const saveShippingAddress =
  (shippingAddress) => (dispatch, getState) => {
    dispatch({ type: ADD_ADDRESS, payload: shippingAddress });
    localStorage.setItem(
      "address",
      JSON.stringify(getState().address.shippingAddress)
    );
  };
