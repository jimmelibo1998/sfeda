import {
  ANNOUNCEMENT_ADDED,
  ANNOUNCEMENTS_FETCHED,
  ANNOUNCEMENT_POSTPONED
} from "../actions/types";

let initialState = {
  currentAnn: null,
  anns: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ANNOUNCEMENT_POSTPONED:
      return {
        ...state,
        anns: state.anns.filter(ann => ann._id !== payload._id)
      };
    case ANNOUNCEMENTS_FETCHED:
      return { ...state, anns: payload };
    case ANNOUNCEMENT_ADDED:
      return { ...state, anns: [...state.anns, payload] };
    default:
      return state;
  }
}
