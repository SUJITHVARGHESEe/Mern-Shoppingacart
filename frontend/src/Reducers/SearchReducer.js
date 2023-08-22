import {
  SEARCH_PRODUCTS,
  SEARCH_PRODUCTS_FAILURE,
  SEARCH_PRODUCTS_SUCCESS,
  SET_SEARCH_FILTERS,
} from "../Action/SearchAction";

const PAGE_SIZE = 8;
const initialState = {
  filters: {
    pageSize: PAGE_SIZE,
    page: 1,
    category: "",
    price: "",
    rating: "",
    order: "",
    query: "",
  },
  products: [],
  countProducts: 0,
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

const searchproductReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };
    case SEARCH_PRODUCTS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SEARCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        countProducts: action.payload.countProducts,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
        loading: false,
        error: null,
      };
    case SEARCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default searchproductReducer;
