import {
  DATE_EXCLUDED,
  DATE_EXCLUDE_FAILED,
  NO_CALLS_FETCHED,
  NO_CALLS_FETCH_FAILED,
  EXCLUDED_DATE_REMOVED,
  REMOVE_DATE_FAILED,
  NO_CALL_CLEARED
} from "../actions/types";
import myServer from "../apis/myServer";
import setAlert from "./alert";

export const clearNoCalls = () => async dispatch => {
  await dispatch({ type: NO_CALL_CLEARED });
};

export const updateAllMasterlistGoalScore = (
  goalscore,
  month
) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ month });

  try {
    await myServer.put(`/api/masterlist/goalscore/${goalscore}`, body, config);
    console.log("updaed");
    dispatch(setAlert("Goal Score Updated!", "green"));
  } catch (err) {
    console.log(err);
    dispatch(setAlert("Goal not changed", "deep-orange accent-1"));
  }
};

export const removeExcludedDate = (nocallid, dateid) => async dispatch => {
  try {
    let res = await myServer.put(`/api/mdcalls/nocalls/${nocallid}/${dateid}`);
    dispatch({ type: EXCLUDED_DATE_REMOVED, payload: res.data });
    dispatch(setAlert("Removed!", "green"));
  } catch (err) {
    dispatch({ type: REMOVE_DATE_FAILED });
    dispatch(setAlert("Remove Failed", "deep-orange accent-1"));
  }
};

export const fetchMasterlistCall = month => async dispatch => {
  try {
    let res = await myServer.get(`/api/mdcalls/nocalls/${month}`);
    await dispatch({ type: NO_CALLS_FETCHED, payload: res.data });
    dispatch(setAlert("No Calls Fetched!", "green"));
  } catch (error) {
    dispatch({ type: NO_CALLS_FETCH_FAILED });
    dispatch(setAlert("No calls fetched", "deep-orange accent-1"));
  }
};

export const excludeDate = (date, desc) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ date, desc });

  try {
    let res = await myServer.post("/api/mdcalls/nocalls", body, config);
    await dispatch({ type: DATE_EXCLUDED, payload: res.data });
    dispatch(setAlert("Date Excluded!", "green"));
  } catch (err) {
    await dispatch({ type: DATE_EXCLUDE_FAILED });
    dispatch(setAlert("Date Exclude Failed", "deep-orange accent-1"));
  }
};
