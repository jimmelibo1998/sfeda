import {
  DOCTORS_MASTERLISTS_DCRS,
  REGIONAL_FETCHED,
  REPORTS_CLEARED,
  ACTIVE_MEDREP_FETCHED,
  ACTIVE_MEDREP_CLEARED,
  ACTIVE_MEDREP_PERF_FETCHED,
  PERF_CLEARED,
  REGIONAL_CLEARED,
  REPORTS_MASTERLIST_FETCHED,
  REPORTS_DCR_FETCHED,
  CLEAR_MD_CALLS,
  ACTIVE_MEDREP_UPDATED
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
  },
  activeMedrep: {
    userDetails: null,
    performance: {
      callRate: [],
      callFreq: [],
      callReach: []
    },
    mdCalls: {
      masterlist: null,
      dcrs: []
    }
  }
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGIONAL_CLEARED:
      return {
        ...state,
        regional: {
          callRate: [],
          callFreq: [],
          callReach: []
        }
      };
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
    case ACTIVE_MEDREP_PERF_FETCHED:
      return {
        ...state,
        activeMedrep: {
          ...state.activeMedrep,
          performance: {
            ...state.activeMedrep.performance,
            callRate: [
              ...state.activeMedrep.performance.callRate,
              payload.callRate
            ],
            callFreq: [
              ...state.activeMedrep.performance.callFreq,
              payload.callFreq
            ],
            callReach: [
              ...state.activeMedrep.performance.callReach,
              payload.callReach
            ]
          }
        }
      };
    case ACTIVE_MEDREP_UPDATED:
    case ACTIVE_MEDREP_FETCHED:
      return {
        ...state,
        activeMedrep: { ...state.activeMedrep, userDetails: payload }
      };
    case REPORTS_MASTERLIST_FETCHED:
      return {
        ...state,
        activeMedrep: {
          ...state.activeMedrep,
          mdCalls: { ...state.activeMedrep.mdCalls, masterlist: payload }
        }
      };

    case REPORTS_DCR_FETCHED:
      return {
        ...state,
        activeMedrep: {
          ...state.activeMedrep,
          mdCalls: { ...state.activeMedrep.mdCalls, dcrs: payload }
        }
      };
    case CLEAR_MD_CALLS:
      return {
        ...state,
        activeMedrep: {
          ...state.activeMedrep,
          mdCalls: { ...state.activeMedrep.mdCalls, dcrs: [], masterlist: null }
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
    case PERF_CLEARED:
      return {
        ...state,
        activeMedrep: {
          ...state.activeMedrep,
          performance: {
            ...state.activeMedrep.performance,
            callRate: [],
            callFreq: [],
            callReach: []
          }
        }
      };
    case ACTIVE_MEDREP_CLEARED:
      return {
        ...state,
        activeMedrep: {
          userDetails: null,
          performance: {
            callRate: [],
            callFreq: [],
            callReach: []
          },
          mdCalls: {
            masterlist: null,
            dcrs: []
          }
        }
      };
    default:
      return state;
  }
}
