import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  USER_LOADED,
  AUTH_ERROR,
  LOG_OUT,
  ADMIN_ACCOUNT_UPDATED
} from "./types";
import myServer from "../apis/myServer";
import setAuthToken from "../utils/setAuthToken";
import setAlert from "./alert";
import history from "../history";

export const changeAdminInfo = (firstName, lastName, email) => async (
  dispatch,
  getState
) => {
  console.log(firstName);
  let adminId = getState().auth.user._id;
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ firstName, lastName, email });

  try {
    let res = await myServer.put(
      `/api/accounts/admin/info/${adminId}`,
      body,
      config
    );
    dispatch({ type: ADMIN_ACCOUNT_UPDATED, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch(setAlert("Admin info not updated", "deep-orange accent-1"));
  }
};

export const changePasswordAdmin = (old, pass1, pass2) => async (
  dispatch,
  getState
) => {
  let id = getState().auth.user._id;
  let config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  let body = JSON.stringify({ old, pass1, pass2 });
  try {
    let res = await myServer.put(
      `/api/accounts/admin/password/${id}`,
      body,
      config
    );
    dispatch(
      setAlert(
        res.data.msg,
        `${res.data.msg === "Password Changed" ? "green" : "yellow"} darken-2`
      )
    );
  } catch (err) {
    console.log(err);
  }
};

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
