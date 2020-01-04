import {
  NOCOVERS_LOADED,
  MEDREP_DETAILS_FETCHED,
  NOCOVER_UPDATED
} from "./types";

import { updateCurrentScoreWithId } from "./masterlist";
import myServer from "../apis/myServer";
import setAlert from "./alert";

export const respondToNoCover = (
  dcrId,
  masterlistId,
  accepted
) => async dispatch => {
  let config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  let body = JSON.stringify({ accepted });

  try {
    await myServer.put(
      `/api/dcr/nocover/respond/${dcrId}/${masterlistId}`,
      body,
      config
    );
    await dispatch({ type: NOCOVER_UPDATED });
    dispatch(updateCurrentScoreWithId(masterlistId));
  } catch (err) {
    console.log(err);
    dispatch(setAlert("DCR not updated", "deep-orange accent-1"));
  }
};

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
