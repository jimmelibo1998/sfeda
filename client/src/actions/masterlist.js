import {
  CURRENT_ML_FETCHED,
  NO_CURRENT_ML,
  ML_DOCTORS_FETCHED,
  NO_ML_DOCTORS,
  ML_CLEARED,
  DOCTOR_DETAILS_FETCHED,
  MASTERLIST_SENT,
  MASTERLIST_ADDED,
  ADD_MASTERLIST_FAILED,
  ML_DOCTOR_ADDED,
  ML_DOCTOR_REMOVED
} from "./types";
import setAlert from "./alert";
import { loadAggregateDoctors } from "./doctors";

import myServer from "../apis/myServer";

export const sendMasterlist = masterlistId => async (dispatch, getState) => {
  const { doctors, doctorDetails } = getState().masterlist;

  if (doctors.length < 60)
    return dispatch(
      setAlert("Doctors must be atleast 60 in total", "deep-orange accent-1")
    );

  let numClassA = doctorDetails.filter(doc => doc.classCode === "A").length;
  if (numClassA < 20)
    return dispatch(
      setAlert(
        "Class A Doctors must be atleast 20 in total",
        "deep-orange accent-1"
      )
    );

  try {
    let res = await myServer.put(`/api/masterlist/send/${masterlistId}`);
    dispatch({ type: MASTERLIST_SENT, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch(setAlert("Masterlist not sent", "deep-orange accent-1"));
  }
};

export const removeDoctorFromML = (masterlistId, doctorId) => async (
  dispatch,
  getState
) => {
  try {
    let res = await myServer.delete(
      `/api/masterlist/delete/${masterlistId}/${doctorId}`
    );
    await dispatch({ type: ML_DOCTOR_REMOVED, payload: res.data });
    await dispatch(loadAggregateDoctors(getState().auth.user.area));
    dispatch(setAlert("Doctor Removed", "green"));
  } catch (err) {
    console.log(err);
    dispatch(setAlert("Doctor not removed", "deep-orange accent-1"));
  }
};

export const addDoctorToML = (masterlistId, doctorId) => async (
  dispatch,
  getState
) => {
  try {
    let res = await myServer.post(
      `/api/masterlist/add/${masterlistId}/${doctorId}`
    );
    console.log(res.data);
    await dispatch({ type: ML_DOCTOR_ADDED, payload: res.data });
    await dispatch(getDoctorDetails(res.data.doctor));
    await dispatch(loadAggregateDoctors(getState().auth.user.area));
    dispatch(setAlert("Doctor Adeed", "green"));
  } catch (err) {
    console.log(err);
    dispatch(setAlert("Doctor not added", "deep-orange accent-1"));
  }
};

export const addMasterlist = (medrep, date) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ date });

  try {
    let res = await myServer.post(`/api/masterlist/${medrep}`, body, config);
    dispatch({ type: MASTERLIST_ADDED, payload: res.data });
    dispatch(setAlert("Masterlist Added!", "green"));
  } catch (err) {
    console.log(err);
    dispatch({ type: ADD_MASTERLIST_FAILED });
    dispatch(setAlert("Add Masterlist Failed", "deep-orange accent-1"));
  }
};

export const clearMasterlist = () => dispatch => {
  dispatch({ type: ML_CLEARED });
};

export const getCurrentMasterlist = id => async (dispatch, getState) => {
  try {
    let res = await myServer.get(`/api/masterlist/${id}`);

    await dispatch({ type: CURRENT_ML_FETCHED, payload: res.data });
    await dispatch(getMasterlistDoctors());

    getState().masterlist.doctors.map(async doctor => {
      await dispatch(getDoctorDetails(doctor.doctor));
    });
  } catch (err) {
    dispatch({ type: NO_CURRENT_ML });
  }
};

export const getMasterlistDoctors = () => async (dispatch, getState) => {
  try {
    let mlDoctors = await myServer.get(
      `/api/masterlist/doctors/${getState().masterlist.masterlist._id}`
    );
    dispatch({ type: ML_DOCTORS_FETCHED, payload: mlDoctors.data });
  } catch (err) {
    dispatch({ type: NO_ML_DOCTORS });
  }
};

// getState.masterlist.doctors.map(
//     async doctor => await dispatch(getDoctorDetails(doctor.doctor))
//   );

export const getDoctorDetails = doctorId => async dispatch => {
  try {
    let res = await myServer.get(`/api/doctors/${doctorId}`);
    dispatch({ type: DOCTOR_DETAILS_FETCHED, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
