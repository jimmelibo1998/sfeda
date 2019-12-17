import {
  CURRENT_ML_FETCHED,
  NO_CURRENT_ML,
  ML_DOCTORS_FETCHED,
  NO_ML_DOCTORS,
  ML_CLEARED
} from "./types";

import myServer from "../apis/myServer";

export const clearMasterlist = () => dispatch => {
  dispatch({ type: ML_CLEARED });
};
export const getCurrentMasterlist = id => async dispatch => {
  try {
    let res = await myServer.get(`/api/masterlist/${id}`);

    await dispatch({ type: CURRENT_ML_FETCHED, payload: res.data });

    dispatch(getMasterlistDoctors(res.data._id));
  } catch (err) {
    dispatch({ type: NO_CURRENT_ML });
  }
};

export const getMasterlistDoctors = masterlistId => async dispatch => {
  try {
    let mlDoctors = await myServer.get(
      `/api/masterlist/doctors/${masterlistId}`
    );
    dispatch({ type: ML_DOCTORS_FETCHED, payload: mlDoctors.data });
  } catch (err) {
    dispatch({ type: NO_ML_DOCTORS });
  }
};
