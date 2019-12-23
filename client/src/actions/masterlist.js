import {
  CURRENT_ML_FETCHED,
  NO_CURRENT_ML,
  ML_DOCTORS_FETCHED,
  NO_ML_DOCTORS,
  ML_CLEARED,
  DOCTOR_DETAILS_FETCHED
} from "./types";

import myServer from "../apis/myServer";

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
