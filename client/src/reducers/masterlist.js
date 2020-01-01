import {
  CURRENT_ML_FETCHED,
  NO_CURRENT_ML,
  ML_DOCTORS_FETCHED,
  NO_ML_DOCTORS,
  ML_CLEARED,
  DOCTOR_DETAILS_FETCHED,
  MASTERLIST_ADDED,
  ADD_MASTERLIST_FAILED,
  ML_DOCTOR_ADDED,
  ML_DOCTOR_REMOVED,
  MASTERLIST_SENT,
  DCR_ADD_FAILED,
  DCR_ADDED,
  DCR_FETCHED,
  ACTIVE_DCR_SET,
  DCR_DOCTORS_FETCHED,
  ACTIVE_DCR_CLEAR,
  DCR_DOCTOR_ADDED,
  DOCTOR_COUNT_UPDATED,
  DCR_DOCTOR_REMOVED,
  TOTAL_VISITS_POINTS_UPDATED,
  CURRENT_SCORE_UPDATED,
  ALREADY_EXCLUDED
} from "../actions/types";

const initialState = {
  masterlist: null,
  doctors: [],
  doctorDetails: [],
  dcrs: [],
  activeDcr: null,
  dcrDoctors: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case DCR_DOCTOR_REMOVED:
      return {
        ...state,
        dcrDoctors: state.dcrDoctors.filter(doc => doc._id !== payload._id)
      };
    case DCR_DOCTOR_ADDED:
      return { ...state, dcrDoctors: [...state.dcrDoctors, payload] };
    case ACTIVE_DCR_CLEAR:
      return { ...state, activeDcr: null, dcrDoctors: [] };
    case ACTIVE_DCR_SET:
    case DOCTOR_COUNT_UPDATED:
    case TOTAL_VISITS_POINTS_UPDATED:
      return { ...state, activeDcr: payload };
    case DCR_DOCTORS_FETCHED:
      return { ...state, dcrDoctors: payload };
    case DCR_FETCHED:
      return { ...state, dcrs: payload };
    case DCR_ADDED:
      return { ...state, dcrs: [...state.dcrs, payload] };
    case DOCTOR_DETAILS_FETCHED:
      return { ...state, doctorDetails: [...state.doctorDetails, payload] };
    case MASTERLIST_SENT:
    case CURRENT_SCORE_UPDATED:
    case CURRENT_ML_FETCHED:
    case MASTERLIST_ADDED:
      return { ...state, masterlist: payload };
    case ML_DOCTOR_ADDED:
      return { ...state, doctors: [...state.doctors, payload] };
    case ML_DOCTOR_REMOVED:
      return {
        ...state,
        doctors: state.doctors.filter(
          doctor => doctor.doctor !== payload.doctor
        ),
        doctorDetails: state.doctorDetails.filter(
          detail => detail._id !== payload.doctor
        )
      };
    case ML_DOCTORS_FETCHED:
      return { ...state, doctors: payload };
    case NO_ML_DOCTORS:
      return { ...state, doctors: null };

    case ADD_MASTERLIST_FAILED:
    case NO_CURRENT_ML:
    case ML_CLEARED:
      return {
        ...state,
        masterlist: null,
        doctors: [],
        dcrs: [],
        doctorDetails: [],
        activeDcr: null,
        dcrDoctors: []
      };
    case DCR_ADD_FAILED:
    case ALREADY_EXCLUDED:
    default:
      return state;
  }
}
