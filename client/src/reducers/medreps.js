import {
  MEDREP_ADDED,
  ADD_MEDREP_FAILED,
  MEDREPS_FETCHED,
  NO_MEDREPS,
  MEDREPS_CLEARED
} from "../actions/types";
export default function(state = null, action) {
  const { type, payload } = action;

  switch (type) {
    case MEDREP_ADDED:
    case MEDREPS_FETCHED:
      return payload;
    case ADD_MEDREP_FAILED:
    case NO_MEDREPS:
    case MEDREPS_CLEARED:
      return null;
    default:
      return state;
  }
}
