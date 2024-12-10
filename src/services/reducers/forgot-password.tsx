import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  ForgotPasswordActionTypes,
} from "../actions/forgot-password";

interface ForgotPasswordState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

export const initialState: ForgotPasswordState = {
  isLoading: false,
  error: null,
  success: false,
};

export const forgotPasswordReducer = (
  state = initialState,
  action: ForgotPasswordActionTypes,
): ForgotPasswordState => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return { ...state, isLoading: true, error: null, success: false };
    case FORGOT_PASSWORD_SUCCESS:
      return { ...state, isLoading: false, success: true };
    case FORGOT_PASSWORD_FAILURE:
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
