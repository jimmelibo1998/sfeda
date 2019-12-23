import {
  DOCTORS_LOADED,
  LOAD_DOCTORS_FAILED,
  DOCTORS_CLEARED
} from "../actions/types";
import myServer from "../apis/myServer";
import alert from "./alert";

export const fetchAllDoctors = () => async dispatch => {
  try {
    let res = await myServer.get("/api/doctors");
    dispatch({ type: DOCTORS_LOADED, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: LOAD_DOCTORS_FAILED });
    alert("No Doctors found", "deep-orange accent-1");
  }
};

export const clearDoctors = () => async dispatch => {
  dispatch({ type: DOCTORS_CLEARED });
};
