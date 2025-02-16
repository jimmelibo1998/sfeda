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
  ML_DOCTOR_REMOVED,
  DCR_ADD_FAILED,
  DCR_ADDED,
  DCR_FETCHED,
  ACTIVE_DCR_SET,
  DCR_DOCTORS_FETCHED,
  ACTIVE_DCR_CLEAR,
  DCR_DOCTOR_ADDED,
  DOCTOR_COUNT_UPDATED,
  DCR_DOCTOR_REMOVED,
  TOTAL_VISITS_POINTS_UPDATED,
  CURRENT_SCORE_UPDATED,
  DOCTOR_DETAILS_FILTERED
} from "./types";
import setAlert from "./alert";
import { loadAggregateDoctors } from "./doctors";
import history from "../history";

import myServer from "../apis/myServer";

export const setDcrToNoCover = reason => async (dispatch, getState) => {
  let config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  let body = JSON.stringify({ reason });
  try {
    let res = await myServer.put(
      `/api/dcr/nocover/add/${getState().masterlist.activeDcr._id}`,
      body,
      config
    );
    history.push("/medrep/perform/dcr");
    dispatch({ type: ACTIVE_DCR_SET, payload: res.data });
  } catch (err) {
    console.error(err);
    dispatch(setAlert("SET TO NO COVER FAILED", "deep-orange accent-1"));
  }
};

export const updateVisited = (dcrDoctorId, visited, doctorId) => async (
  dispatch,
  getState
) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ visited });

  console.log(visited);
  try {
    await myServer.put(`/api/dcr/doctors/visited/${dcrDoctorId}`, body, config);
    await dispatch(fetchDcrDoctors(getState().masterlist.activeDcr._id));
    await dispatch(updateTotalVisitsPoints());
    if (doctorId) {
      await dispatch(updateMasterlistDoctor(doctorId, visited));
    }

    await dispatch(getMasterlistDoctors());
    await dispatch(updateCurrentScore());
  } catch (err) {
    console.error(err);
    dispatch(setAlert("VISITED NOT UPDATED", "deep-orange accent-1"));
  }
};

export const updateCurrentScore = () => async (dispatch, getState) => {
  let masterlistId = getState().masterlist.masterlist._id;
  try {
    let res = await myServer.put(
      `/api/masterlist/currentscore/${masterlistId}`
    );
    dispatch({ type: CURRENT_SCORE_UPDATED, payload: res.data });
  } catch (err) {
    console.error(err);
    dispatch(setAlert("Current Score not Updated", "deep-orange accent-1"));
  }
};

export const updateCurrentScoreWithId = masterlistId => async dispatch => {
  try {
    let res = await myServer.put(
      `/api/masterlist/currentscore/${masterlistId}`
    );
    dispatch({ type: CURRENT_SCORE_UPDATED, payload: res.data });
  } catch (err) {
    console.error(err);
    dispatch(setAlert("Current Score not Updated", "deep-orange accent-1"));
  }
};

export const updateMasterlistDoctor = (doctorId, visited) => async (
  dispatch,
  getState
) => {
  let date = getState().masterlist.activeDcr.date;
  let masterlistId = getState().masterlist.masterlist._id;

  let config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  let body = JSON.stringify({ date, visited });

  try {
    let res = await myServer.put(
      `/api/masterlist/doctors/week/${masterlistId}/${doctorId}`,
      body,
      config
    );
    console.log(res.data);
  } catch (err) {
    console.error(err);
    dispatch(
      setAlert("Masterlist Doctor Score not updated", "deep-orange accent-1")
    );
  }
};

export const updateTotalVisitsPoints = () => async (dispatch, getState) => {
  let dcrId = getState().masterlist.activeDcr._id;
  try {
    let res = await myServer.put(`/api/dcr/totalvisits/totalpoints/${dcrId}`);
    dispatch({ type: TOTAL_VISITS_POINTS_UPDATED, payload: res.data });
  } catch (err) {
    console.error(err);
    dispatch(setAlert("TOTALS NOT UPDATED", "deep-orange accent-1"));
  }
};

export const updateDoctorCount = inMasterlist => async (dispatch, getState) => {
  const dcrId = getState().masterlist.activeDcr._id;
  try {
    let res = await myServer.put(
      `/api/dcr/doctors/count/${dcrId}/${inMasterlist}`
    );
    dispatch({ type: DOCTOR_COUNT_UPDATED, payload: res.data });
  } catch (err) {
    console.error(err);
    dispatch(setAlert("DOCTOR COUNT NOT UPDATED", "deep-orange accent-1"));
  }
};

export const removeDoctorFromDcr = (
  dcrDoctorId,
  inMasterlist,
  doctorId
) => async dispatch => {
  try {
    console.log(inMasterlist);
    let res = await myServer.delete(`/api/dcr/remove/doctor/${dcrDoctorId}`);
    await dispatch({ type: DCR_DOCTOR_REMOVED, payload: res.data });
    await dispatch(updateDoctorCount(inMasterlist));
    await dispatch(updateTotalVisitsPoints());
    await dispatch(updateMasterlistDoctor(doctorId, true));

    if (inMasterlist === true) {
      await dispatch(getMasterlistDoctors());
    }
    await dispatch(updateCurrentScore());
  } catch (err) {
    console.error(err);
    dispatch(setAlert("DOCTOR NOT REMOVED", "deep-orange accent-1"));
  }
};

export const addDoctorToDcr = ({
  lastName,
  firstName,
  inMasterlist,
  contact,
  classCode,
  doctorId
}) => async (dispatch, getState) => {
  let dcr = getState().masterlist.activeDcr._id;

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    lastName,
    firstName,
    inMasterlist,
    contact,
    classCode,
    doctorId
  });

  let inDcr = getState().masterlist.dcrDoctors.filter(
    doctor => doctor.contact === contact
  );

  console.log(inDcr);
  if (inDcr.length > 0)
    return dispatch(setAlert("Doctor already in DCR", "deep-orange accent-1"));
  try {
    let res = await myServer.post(
      `/api/dcr/insert/doctor/${dcr}`,
      body,
      config
    );

    await dispatch({ type: DCR_DOCTOR_ADDED, payload: res.data });
    dispatch(updateDoctorCount(inMasterlist));
  } catch (err) {
    console.error(err);
    dispatch(setAlert("Doctor not added", "deep-orange accent-1"));
  }
};

export const activeDcrClear = () => async dispatch => {
  dispatch({ type: ACTIVE_DCR_CLEAR });
};

export const fetchDCR = dcrId => async dispatch => {
  try {
    let res = await myServer.get(`/api/dcr/detail/${dcrId}`);

    await dispatch({ type: ACTIVE_DCR_SET, payload: res.data });
    await dispatch(fetchDcrDoctors(dcrId));
  } catch (err) {
    console.error(err);
    dispatch(setAlert("DCR not fetched", "deep-orange accent-1"));
  }
};

export const fetchDcrDoctors = dcrId => async dispatch => {
  try {
    let res = await myServer.get(`/api/dcr/doctors/${dcrId}`);

    dispatch({ type: DCR_DOCTORS_FETCHED, payload: res.data });
  } catch (err) {
    console.error(err);
    dispatch(setAlert("DOCTORS not fetched", "deep-orange accent-1"));
  }
};

export const fetchAllDcrsInMasterlist = () => async (dispatch, getState) => {
  try {
    let res = await myServer.get(
      `/api/dcr/${getState().masterlist.masterlist._id}`
    );
    dispatch({ type: DCR_FETCHED, payload: res.data });
    dispatch(setAlert("DCRS fetched", "deep-orange accent-1"));
  } catch (err) {
    console.log(err);
    dispatch(setAlert("DCRS not fetched", "deep-orange accent-1"));
  }
};

export const addDcr = (masterlistId, date) => async dispatch => {
  try {
    let res = await myServer.post(`/api/dcr/${masterlistId}/${date}`);
    dispatch({ type: DCR_ADDED, payload: res.data });
    dispatch(setAlert("DCR Added", "deep-orange accent-1"));
  } catch (err) {
    console.log(err);
    dispatch({ type: DCR_ADD_FAILED });
    dispatch(setAlert("DCR not added", "deep-orange accent-1"));
  }
};

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

export const addDoctorToML = (masterlistId, doctorId, classCode) => async (
  dispatch,
  getState
) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  console.log(masterlistId);
  const body = JSON.stringify({ classCode });
  try {
    let res = await myServer.post(
      `/api/masterlist/add/${masterlistId}/${doctorId}`,
      body,
      config
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

export const addMasterlist = (medrep, date) => async (dispatch, getState) => {
  let area = getState().auth.user.area;
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ date });

  try {
    let res = await myServer.post(
      `/api/masterlist/${medrep}/${area}`,
      body,
      config
    );
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
    await getState().masterlist.doctors.map(doctor => {
      dispatch(getDoctorDetails(doctor.doctor));
    });
    await dispatch(fetchAllDcrsInMasterlist());
  } catch (err) {
    dispatch({ type: NO_CURRENT_ML });
  }
};

export const filterDoctorDetails = filtered => async dispatch => {
  dispatch({ type: DOCTOR_DETAILS_FILTERED, payload: filtered });
};

export const getDoctorAndDetails = () => async (dispatch, getState) => {
  await dispatch(getMasterlistDoctors());
  await getState().masterlist.doctors.map(doctor => {
    dispatch(getDoctorDetails(doctor.doctor));
  });
};

export const getMonthMasterlist = month => async (dispatch, getState) => {
  let medrepId = getState().auth.user._id;
  try {
    let res = await myServer.get(`/api/masterlist/month/${medrepId}/${month}`);
    await dispatch({ type: CURRENT_ML_FETCHED, payload: res.data });
    await dispatch(getMasterlistDoctors());
    await getState().masterlist.doctors.map(doctor => {
      dispatch(getDoctorDetails(doctor.doctor));
    });
    await dispatch(fetchAllDcrsInMasterlist());
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
    let res = await myServer.get(`/api/doctors/current/${doctorId}`);
    dispatch({ type: DOCTOR_DETAILS_FETCHED, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
