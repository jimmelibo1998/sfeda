import {
  DOCTORS_LOADED,
  LOAD_DOCTORS_FAILED,
  DOCTORS_CLEARED,
  DOCTOR_ADD_FAILED,
  DOCTOR_ADDED
} from "../actions/types";

export default function(state = null, action) {
  const { type, payload } = action;
  switch (type) {
    case DOCTORS_LOADED:
    case DOCTOR_ADDED:
      return payload.length > 0 ? payload : null;
    case LOAD_DOCTORS_FAILED:
    case DOCTORS_CLEARED:
    case DOCTOR_ADD_FAILED:
      return null;
    default:
      return state;
  }
}
