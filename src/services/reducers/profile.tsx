import {
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_LOGOUT,
  ProfileActionTypes,
} from "../actions/profile";

interface ProfileState {
  isLoading: boolean;
  name: string;
  email: string;
  error: string | null;
  successMessage: string | null;
}

export const initialState: ProfileState = {
  isLoading: false,
  name: "",
  email: "",
  error: null,
  successMessage: null,
};

export const profileReducer = (
  state = initialState,
  action: ProfileActionTypes,
): ProfileState => {
  switch (action.type) {
    case PROFILE_REQUEST:
      return { ...state, isLoading: true, error: null, successMessage: null };
    case PROFILE_SUCCESS:
    case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        name: action.payload.name,
        email: action.payload.email,
        error: null,
      };
    case PROFILE_FAILURE:
      return { ...state, isLoading: false, error: action.error ?? null };
    case PROFILE_LOGOUT:
      return initialState;
    default:
      return state;
  }
};
