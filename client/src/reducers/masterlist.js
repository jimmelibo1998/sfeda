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
  MASTERLIST_SENT
} from "../actions/types";

const initialState = {
  masterlist: null,
  doctors: [],
  doctorDetails: [],
  dcrs: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case DOCTOR_DETAILS_FETCHED:
      return { ...state, doctorDetails: [...state.doctorDetails, payload] };
    case MASTERLIST_SENT:
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
        dcrs: null,
        doctorDetails: []
      };
    default:
      return state;
  }
}
