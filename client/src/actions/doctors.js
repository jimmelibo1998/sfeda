import {
  DOCTORS_LOADED,
  LOAD_DOCTORS_FAILED,
  DOCTORS_CLEARED,
  DOCTOR_ADDED,
  DOCTOR_ADD_FAILED
} from "../actions/types";
import myServer from "../apis/myServer";
import setAlert from "./alert";

export const searchByName = doctors => dispatch => {
  dispatch({ type: DOCTORS_LOADED, payload: doctors });
};

export const loadAggregateDoctors = area => async dispatch => {
  console.log("Aggrrr");
  try {
    let res = await myServer.get(`/api/doctors/area/${area}`);
    dispatch({ type: DOCTORS_LOADED, payload: res.data });
  } catch (err) {
    console.error(err);
    dispatch({ type: LOAD_DOCTORS_FAILED });
  }
};

export const loadAggregateDoctorsClassCode = (
  classcode,
  area
) => async dispatch => {
  console.log("Aggrrr");
  try {
    let res = await myServer.get(`/api/doctors/classcode/${classcode}/${area}`);
    dispatch({ type: DOCTORS_LOADED, payload: res.data });
  } catch (err) {
    console.error(err);
    dispatch({ type: LOAD_DOCTORS_FAILED });
  }
};

export const addDoctor = (
  lastName,
  firstName,
  classCode,
  area,
  specialityCode,
  institution,
  email
) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    firstName,
    lastName,
    area,
    email,
    classCode,
    specialityCode,
    institution
  });

  try {
    let res = await myServer.post("/api/accounts/doctor", body, config);
    dispatch({ type: DOCTOR_ADDED, payload: [res.data] });
    dispatch(setAlert("New Doctor Created!", "green"));
  } catch (err) {
    console.error(err);
    dispatch({ type: DOCTOR_ADD_FAILED });
    dispatch(setAlert("Not Created", "deep-orange accent-1"));
  }
};

export const fetchAllDoctors = () => async (dispatch, getState) => {
  let area = getState().auth.user.area;
  try {
    let res = await myServer.get(`/api/doctors/${area}`);
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
