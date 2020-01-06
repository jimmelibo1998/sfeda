import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  USER_LOADED,
  AUTH_ERROR,
  LOG_OUT
} from "./types";
import myServer from "../apis/myServer";
import setAuthToken from "../utils/setAuthToken";
import setAlert from "./alert";
import history from "../history";

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    try {
      setAuthToken(localStorage.token);
      const res = await myServer.get("/api/auth");

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      await dispatch({
        type: AUTH_ERROR
      });
    }
  }
};

export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await myServer.post("/api/auth", body, config);
    await dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    await dispatch(setAlert("Log In is Successful", "green"));
    await dispatch(loadUser());
  } catch (err) {
    console.error(err.message);
    await dispatch({ type: LOGIN_FAILED });
    dispatch(setAlert("Invalid Credentials", "deep-orange accent-1"));
  }
};

// Logout / Clear
export const logout = () => dispatch => {
  dispatch({ type: LOG_OUT });
  history.push("/");
};
