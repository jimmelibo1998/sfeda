import {
  DOCTORS_MASTERLISTS_DCRS,
  REGIONAL_FETCHED,
  REPORTS_CLEARED,
  ACTIVE_MEDREP_FETCHED,
  ACTIVE_MEDREP_CLEARED,
  ACTIVE_MEDREP_PERF_FETCHED,
  PERF_CLEARED,
  REGIONAL_CLEARED
} from "./types";
import myServer from "../apis/myServer";
import setAlert from "./alert";
import { months } from "../functions/getMonths";
export const fetchMedrepPerf = (year, medrepId) => async dispatch => {
  console.log(year + " " + medrepId);
  try {
    await dispatch({ type: PERF_CLEARED });
    months(year).map(async month => {
      let res = await myServer.get(
        `/api/reports/medrep/perf/${medrepId}/${month + " " + year}`
      );
      dispatch({ type: ACTIVE_MEDREP_PERF_FETCHED, payload: res.data });
    });
  } catch (err) {
    await dispatch({ type: ACTIVE_MEDREP_CLEARED });
    dispatch(setAlert("Error", "deep-orange accent-1"));
  }
};

export const clearActiveMedrep = () => async dispatch => {
  dispatch({ type: ACTIVE_MEDREP_CLEARED });
};

export const fetchActiveMedrep = id => async dispatch => {
  try {
    let res = await myServer.get(`/api/reports/medrep/${id}`);
    dispatch({ type: ACTIVE_MEDREP_FETCHED, payload: res.data });
  } catch (err) {
    console.error(err);
    dispatch(setAlert("Active Medrep not fetched", "deep-orange accent-1"));
  }
};

export const clearReports = () => async dispatch => {
  dispatch({ type: REPORTS_CLEARED });
};

export const getRegional = (area, year) => async dispatch => {
  try {
    dispatch({ type: REGIONAL_CLEARED });
    months(year).map(async month => {
      let monthYear = month + " " + year;
      let res = await myServer.get(`/api/reports/average/${area}/${monthYear}`);
      dispatch({
        type: REGIONAL_FETCHED,
        payload: {
          callReach: res.data.avgCallReach,
          callFreq: res.data.avgCallFreq,
          callRate: res.data.avgCallRate
        }
      });
    });
  } catch (err) {
    console.error(err);
    dispatch(setAlert("Error", "deep-orange accent-1"));
  }
};

export const getCurrents = () => async dispatch => {
  try {
    let res = await myServer.get(`/api/reports/dmd`);
    dispatch({ type: DOCTORS_MASTERLISTS_DCRS, payload: res.data });
  } catch (err) {
    console.error(err);
    dispatch(setAlert("No data fetched", "deep-orange accent-1"));
  }
};
