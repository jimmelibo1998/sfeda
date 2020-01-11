import {
  ANNOUNCEMENT_ADDED,
  ANNOUNCEMENTS_FETCHED,
  ANNOUNCEMENT_POSTPONED
} from "./types";
import setAlert from "./alert";
import myServer from "../apis/myServer";
import moment from "moment";

export const postponeAnnouncement = id => async dispatch => {
  try {
    let res = await myServer.put(`/api/announcements/${id}`);
    dispatch({ type: ANNOUNCEMENT_POSTPONED, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch(setAlert("Announcements not postponed", "deep-orange accent-1"));
  }
};

export const fetchAnnouncements = () => async dispatch => {
  try {
    let res = await myServer.get("/api/announcements");
    let payload = res.data.filter(
      ann => ann.end >= moment().format("YYYY-MM-DD")
    );
    dispatch({
      type: ANNOUNCEMENTS_FETCHED,
      payload: payload
    });
  } catch (err) {
    console.log(err);
    dispatch(setAlert("Announcements not fetched", "deep-orange accent-1"));
  }
};

export const addAnnouncement = (
  area,
  title,
  desc,
  start,
  end
) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ title, start, end, desc });

  try {
    let res = await myServer.post(`/api/announcements/${area}`, body, config);
    dispatch({ type: ANNOUNCEMENT_ADDED, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch(setAlert("Announcement not added", "deep-orange accent-1"));
  }
};
