import {
  DATE_EXCLUDED,
  DATE_EXCLUDE_FAILED,
  NO_CALLS_FETCHED,
  NO_CALLS_FETCH_FAILED,
  EXCLUDED_DATE_REMOVED,
  REMOVE_DATE_FAILED
} from "../actions/types";
export default function(state = null, action) {
  const { type, payload } = action;

  switch (type) {
    case DATE_EXCLUDED:
    case NO_CALLS_FETCHED:
    case EXCLUDED_DATE_REMOVED:
      return payload;
    case REMOVE_DATE_FAILED:
    case NO_CALLS_FETCH_FAILED:
    case DATE_EXCLUDE_FAILED:
    default:
      return state;
  }
}
