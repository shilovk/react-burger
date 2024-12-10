import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  ResetPasswordActionTypes,
} from "../actions/reset-password";

interface ResetPasswordState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

export const initialState: ResetPasswordState = {
  isLoading: false,
  error: null,
  success: false,
};

export const resetPasswordReducer = (
  state = initialState,
  action: ResetPasswordActionTypes,
): ResetPasswordState => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return { ...state, isLoading: true, error: null, success: false };
    case RESET_PASSWORD_SUCCESS:
      return { ...state, isLoading: false, success: true };
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        success: false,
      };
    default:
      return state;
  }
};
