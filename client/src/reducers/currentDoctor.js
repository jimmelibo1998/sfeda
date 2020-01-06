import {
  CURRENT_DOCTOR_LOADED,
  CURRENT_DOCTOR_LOAD_FAILED,
  CLEAR_CURRENT_DOCTOR,
  CURRENT_DOCTOR_UPDATED
} from "../actions/types";

export default function(state = null, action) {
  const { type, payload } = action;
  switch (type) {
    case CURRENT_DOCTOR_LOADED:
    case CURRENT_DOCTOR_UPDATED:
      return (state = payload);
    case CURRENT_DOCTOR_LOAD_FAILED:
    case CLEAR_CURRENT_DOCTOR:
      return (state = null);
    default:
      return state;
  }
}
