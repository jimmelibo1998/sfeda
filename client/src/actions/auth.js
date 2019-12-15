import { LOGIN_SUCCESS, LOGIN_FAILED, USER_LOADED, AUTH_ERROR } from "./types";
import myServer from "../apis/myServer";
import setAuthToken from "../utils/setAuthToken";

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
      dispatch({
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
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    console.error(err.message);
    dispatch({ type: LOGIN_FAILED });
  }
};
