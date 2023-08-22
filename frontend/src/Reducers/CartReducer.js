import { ADD_TO_CART, CART_CLEAR_ITEMS } from "../Action/CartAction";
import { REMOVE_PRODUCT, UPDATE_QUANTITY } from "../Action/CartQuantityAction";

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.cartItems.find((item) => {
        return item.slug === action.payload.product.slug;
      });
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) => {
            return item.slug === existingItem.slug
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item;
          }),
        };
      } else {
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            { ...action.payload.product, quantity: 1 },
          ],
        };
      }
    case UPDATE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.slug === action.payload.slug ? action.payload : item
        ),
      };

    case REMOVE_PRODUCT:
      return {
        ...state,
        cartItems: action.payload,
      };
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
