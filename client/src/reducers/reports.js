import {
  DOCTORS_MASTERLISTS_DCRS,
  REGIONAL_FETCHED,
  REPORTS_CLEARED
} from "../actions/types";

let initialState = {
  current: {
    doctors: 0,
    masterlists: 0,
    dcrs: 0
  },
  regional: {
    callRate: [],
    callFreq: [],
    callReach: []
  }
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGIONAL_FETCHED:
      return {
        ...state,
        regional: {
          callRate: [...state.regional.callRate, payload.callRate],
          callFreq: [...state.regional.callFreq, payload.callFreq],
          callReach: [...state.regional.callReach, payload.callReach]
        }
      };
    case DOCTORS_MASTERLISTS_DCRS:
      return {
        ...state,
        current: {
          doctors: payload.doctors,
          masterlists: payload.masterlists,
          dcrs: payload.dcrs
        }
      };
    case REPORTS_CLEARED:
      return {
        ...state,
        current: {
          doctors: 0,
          masterlists: 0,
          dcrs: 0
        },
        regional: {
          callRate: [],
          callFreq: [],
          callReach: []
        }
      };
    default:
      return state;
  }
}
