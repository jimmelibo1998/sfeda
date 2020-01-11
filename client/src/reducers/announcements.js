import { ANNOUNCEMENT_ADDED } from "../actions/types";

let initialState = {
  currentAnn: null,
  anns: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ANNOUNCEMENT_ADDED:
      return { ...state, anns: [...state.anns, payload] };
    default:
      return state;
  }
}
