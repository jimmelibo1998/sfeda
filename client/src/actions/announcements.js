import { ANNOUNCEMENT_ADDED } from "./types";
import setAlert from "./alert";
import myServer from "../apis/myServer";

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
