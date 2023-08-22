import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from "../Action/UserAction";

const initialState = {
  token: null,
  loading: false,
  error: null,
  user: null,
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: false };
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        user: action.payload.user,
        error: null,
      };
    case SIGNUP_FAIL:
    case LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case LOGOUT_SUCCESS:
      return { ...state, token: null, user: null };
    case UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true, error: false };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        error: null,
      };
    case UPDATE_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default signupReducer;
