import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from "./Reducers/ProductReducer";
import cartReducer from "./Reducers/CartReducer";
import signupReducer from "./Reducers/UserReducer";
import { shippingReducer } from "./Reducers/AddressReducer";
import { orderReducer } from "./Reducers/OrderReducer";
import searchproductReducer from "./Reducers/SearchReducer";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("address")
  ? JSON.parse(localStorage.getItem("address"))
  : [];

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  user: signupReducer,
  address: shippingReducer,
  orders: orderReducer,
  searchProduct: searchproductReducer,
});

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    cart: { cartItems: cartItemsFromStorage },
    user: { user: userFromStorage },
    address: { shippingAddress: shippingAddressFromStorage },
  },
});

export default store;
