import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  USER_LOADED,
  AUTH_ERROR
} from "../actions/types";
import jwtDecode from "jwt-decode";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  role: null
};

if (localStorage.token) {
  initialState.role = jwtDecode(localStorage.token).user.role;
}

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return { ...state, isAuthenticated: true, loading: false, user: payload };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        role: jwtDecode(payload.token).user.role
      };
    case LOGIN_FAILED:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        role: null
      };
    default:
      return state;
  }
}
