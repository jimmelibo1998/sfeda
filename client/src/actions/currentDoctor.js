import {
  CURRENT_DOCTOR_LOADED,
  CURRENT_DOCTOR_LOAD_FAILED,
  CLEAR_CURRENT_DOCTOR,
  CURRENT_DOCTOR_UPDATED
} from "../actions/types";
import setAlert from "./alert";
import myServer from "../apis/myServer";

export const updateCurrentDoctor = (
  id,
  lastName,
  firstName,
  specialityCode,
  classCode,
  area,
  institution
) => async dispatch => {
  let config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  let body = JSON.stringify({
    lastName,
    firstName,
    specialityCode,
    classCode,
    area,
    institution
  });
  try {
    let res = await myServer.put(`/api/doctors/update/${id}`, body, config);
    dispatch({ type: CURRENT_DOCTOR_UPDATED, payload: res.data });
    dispatch(setAlert("DOCTOR UPDATED", "green"));
  } catch (error) {
    console.log(error);
  }
};

export const clearCurrentDoctor = () => async dispatch => {
  dispatch({ type: CLEAR_CURRENT_DOCTOR });
};

export const loadCurrentDoctor = id => async dispatch => {
  try {
    let res = await myServer.get(`/api/doctors/current/${id}`);
    dispatch({ type: CURRENT_DOCTOR_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: CURRENT_DOCTOR_LOAD_FAILED });
  }
};
