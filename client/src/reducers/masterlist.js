import {
  CURRENT_ML_FETCHED,
  NO_CURRENT_ML,
  ML_DOCTORS_FETCHED,
  NO_ML_DOCTORS,
  ML_CLEARED
} from "../actions/types";

const initialState = {
  masterlist: null,
  doctors: [],
  dcrs: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  let doctors = state.doctors;
  switch (type) {
    case CURRENT_ML_FETCHED:
      return { ...state, masterlist: payload };

    case ML_DOCTORS_FETCHED:
      return { ...state, doctors: payload };
    case NO_ML_DOCTORS:
      return { ...state, doctors: null };
    case NO_CURRENT_ML:
    case ML_CLEARED:
      return { ...state, masterlist: null, doctors: null, dcrs: null };
    default:
      return state;
  }
}
