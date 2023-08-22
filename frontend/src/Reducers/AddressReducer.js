import { ADD_ADDRESS } from "../Action/AddressAction";
import { LOGOUT_SUCCESS } from "../Action/UserAction";
const initialState = {
  shippingAddress: {},
};

export const shippingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    case LOGOUT_SUCCESS:
      return { ...state, shippingAddress: {} };
    default:
      return state;
  }
};
