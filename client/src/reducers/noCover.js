import {
  NOCOVERS_LOADED,
  MEDREP_DETAILS_FETCHED,
  NOCOVER_UPDATED
} from "../actions/types";

let initialState = {
  dcrs: [],
  medreps: []
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case NOCOVERS_LOADED:
      return { ...state, dcrs: payload };
    case MEDREP_DETAILS_FETCHED:
      return {
        ...state,
        medreps: [...state.medreps, payload].filter((medrep, index) => {
          const _medrep = JSON.stringify(medrep);
          return (
            index ===
            [...state.medreps, payload].findIndex(obj => {
              return JSON.stringify(obj) === _medrep;
            })
          );
        })
      };
    case NOCOVER_UPDATED:
    default:
      return state;
  }
}
