import {
  DOCTORS_MASTERLISTS_DCRS,
  REGIONAL_FETCHED,
  REPORTS_CLEARED
} from "./types";
import myServer from "../apis/myServer";
import setAlert from "./alert";
import { months } from "../functions/getMonths";

export const clearReports = () => async dispatch => {
  dispatch({ type: REPORTS_CLEARED });
};

export const getRegional = (area, year) => async dispatch => {
  try {
    months().map(async month => {
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
