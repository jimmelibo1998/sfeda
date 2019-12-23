import { combineReducers } from "redux";
import auth from "./auth";
import alerts from "./alert";
import masterlist from "./masterlist";
import doctors from "./doctors";
import medrep from "./medreps";

export default combineReducers({
  auth,
  alerts,
  masterlist,
  doctors,
  medrep
});
