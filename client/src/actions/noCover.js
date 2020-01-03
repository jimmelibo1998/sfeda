import { NOCOVERS_LOADED, MEDREP_DETAILS_FETCHED } from "./types";
import myServer from "../apis/myServer";
import setAlert from "./alert";

export const loadNoCovers = () => async (dispatch, getState) => {
  try {
    let res = await myServer.get(`api/dcr/nocover/fetch`);
    await dispatch({ type: NOCOVERS_LOADED, payload: res.data });
    getState().noCovers.dcrs.map(dcr =>
      dispatch(getMedRepDetails(dcr.masterlist))
    );
  } catch (err) {
    console.log(err);
    dispatch(setAlert("No Doctors found", "deep-orange accent-1"));
  }
};

export const getMedRepDetails = masterlistId => async dispatch => {
  try {
    let res = await myServer.get(`/api/dcr/nocover/medrep/${masterlistId}`);
    dispatch({ type: MEDREP_DETAILS_FETCHED, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
