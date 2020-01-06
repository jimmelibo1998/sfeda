import { combineReducers } from "redux";
import auth from "./auth";
import alerts from "./alert";
import masterlist from "./masterlist";
import doctors from "./doctors";
import medrep from "./medreps";
import nocall from "./noCalls";
import noCovers from "./noCover";
import reports from "./reports";
import currentDoctor from "./currentDoctor";

export default combineReducers({
  auth,
  alerts,
  masterlist,
  doctors,
  medrep,
  nocall,
  noCovers,
  reports,
  currentDoctor
});
