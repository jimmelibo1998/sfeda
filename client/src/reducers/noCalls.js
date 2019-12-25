import { DATE_EXCLUDED, DATE_EXCLUDE_FAILED } from "../actions/types";
export default function(state = null, action) {
  const { type, payload } = action;

  switch (type) {
    case DATE_EXCLUDED:
      return payload;
    case DATE_EXCLUDE_FAILED:
    default:
      return state;
  }
}
