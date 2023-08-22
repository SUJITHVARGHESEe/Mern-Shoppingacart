import axios from "axios";
import { getError } from "../utils";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAIL = "LOGOUT_FAIL";

export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAIL = "UPDATE_PROFILE_FAIL";

export const signup = (name, email, password) => async (dispatch, getState) => {
  try {
    dispatch({ type: SIGNUP_REQUEST });
    const { data } = await axios.post("/api/user/signup", {
      name,
      email,
      password,
    });
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: { token: data.token, user: data.user },
    });
    localStorage.setItem("user", JSON.stringify(getState().user.user)); // Store user data
  } catch (error) {
    throw new Error(getError(error));
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await axios.post("/api/user/login", {
      email,
      password,
    });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token: data.token, user: data.user },
    });
    localStorage.setItem("user", JSON.stringify(data.user)); // Store user data
  } catch (error) {
    throw new Error(getError(error));
  }
};

export const logout = () => async (dispatch) => {
  try {
    const res = await axios.post("/api/user/logout");
    dispatch({ type: LOGOUT_SUCCESS });
    localStorage.removeItem("user");
    localStorage.removeItem("address");
  } catch (error) {
    dispatch({ type: LOGIN_FAIL });
  }
};

export const updateProfile =
  (name, email, oldPassword, newPassword, userId) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });

      const { data } = await axios.put("/api/user/profile", {
        name,
        email,
        oldPassword,
        newPassword,
        userId,
      });

      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: { user: data.user },
      });

      localStorage.setItem("user", JSON.stringify(data.user)); // Update user data
    } catch (error) {
      throw new Error(getError(error));
    }
  };
