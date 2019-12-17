import { combineReducers } from "redux";
import auth from "./auth";
import alerts from "./alert";
import masterlist from "./masterlist";

export default combineReducers({
  auth,
  alerts,
  masterlist
});
