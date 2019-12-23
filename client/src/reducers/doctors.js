import {
  DOCTORS_LOADED,
  LOAD_DOCTORS_FAILED,
  DOCTORS_CLEARED
} from "../actions/types";

export default function(state = null, action) {
  const { type, payload } = action;
  switch (type) {
    case DOCTORS_LOADED:
      return payload.length > 0 ? payload : null;
    case LOAD_DOCTORS_FAILED:
    case DOCTORS_CLEARED:
      return null;
    default:
      return state;
  }
}
