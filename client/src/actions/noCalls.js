import { DATE_EXCLUDED, DATE_EXCLUDE_FAILED } from "../actions/types";
import myServer from "../apis/myServer";
import setAlert from "./alert";

export const excludeDate = (date, desc) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ date, desc });
  try {
    let res = await myServer.post("/api/mdcalls/nocalls", body, config);
    dispatch({ type: DATE_EXCLUDED, payload: res.data });
    dispatch(setAlert("Date Excluded!", "green"));
  } catch (err) {
    dispatch({ type: DATE_EXCLUDE_FAILED });
    dispatch(setAlert("Date Exclude Failed", "deep-orange accent-1"));
  }
};
