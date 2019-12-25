import { combineReducers } from "redux";
import auth from "./auth";
import alerts from "./alert";
import masterlist from "./masterlist";
import doctors from "./doctors";
import medrep from "./medreps";
import nocall from "./noCalls";

export default combineReducers({
  auth,
  alerts,
  masterlist,
  doctors,
  medrep,
  nocall
});
