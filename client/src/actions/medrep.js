import {
  MEDREP_ADDED,
  ADD_MEDREP_FAILED,
  MEDREPS_FETCHED,
  NO_MEDREPS,
  MEDREPS_CLEARED
} from "./types";
import myServer from "../apis/myServer";
import setAlert from "./alert";

export const changePassword = (old, pass1, pass2) => async (
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
    let res = await myServer.put(`/api/medreps/password/${id}`, body, config);
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
export const addMedrep = (
  firstName,
  lastName,
  area,
  email
) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ firstName, lastName, area, email });

  try {
    let res = await myServer.post("/api/accounts/medrep", body, config);
    dispatch({ type: MEDREP_ADDED, payload: [res.data] });
    dispatch(setAlert("New Medrep Created!", "green"));
  } catch (err) {
    dispatch(setAlert("Not Created", "deep-orange accent-1"));
    dispatch({ type: ADD_MEDREP_FAILED });
  }
};

export const fetchMedreps = () => async dispatch => {
  try {
    let res = await myServer.get("/api/medreps");
    dispatch({ type: MEDREPS_FETCHED, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch(setAlert("No Doctors Fetched"));
  }
};

export const fetchMedrepsByArea = area => async dispatch => {
  try {
    let res = await myServer.get(`/api/medreps/${area}`);
    if (res.data.length === 0) return dispatch({ type: NO_MEDREPS });
    dispatch({ type: MEDREPS_FETCHED, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch(setAlert("No Doctors Fetched"));
  }
};

export const clearMedreps = () => async dispatch => {
  dispatch({ type: MEDREPS_CLEARED });
};
