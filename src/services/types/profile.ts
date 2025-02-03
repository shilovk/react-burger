import {
  PROFILE_FAILURE,
  PROFILE_LOGOUT,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_UPDATE_SUCCESS,
} from "../constants";

interface ProfileRequestAction {
  type: typeof PROFILE_REQUEST;
}

interface ProfileSuccessAction {
  type: typeof PROFILE_SUCCESS;
  payload: { name: string; email: string };
}

interface ProfileUpdateSuccessAction {
  type: typeof PROFILE_UPDATE_SUCCESS;
  payload: { name: string; email: string };
}

interface ProfileFailureAction {
  type: typeof PROFILE_FAILURE;
  error: string | null;
}

interface ProfileLogoutAction {
  type: typeof PROFILE_LOGOUT;
}

export type ProfileActionTypes =
  | ProfileRequestAction
  | ProfileSuccessAction
  | ProfileUpdateSuccessAction
  | ProfileFailureAction
  | ProfileLogoutAction;
