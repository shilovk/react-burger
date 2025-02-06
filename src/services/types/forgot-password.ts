import { FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS } from "../constants";

interface ForgotPasswordRequestAction {
  type: typeof FORGOT_PASSWORD_REQUEST;
}

interface ForgotPasswordSuccessAction {
  type: typeof FORGOT_PASSWORD_SUCCESS;
}

interface ForgotPasswordFailureAction {
  type: typeof FORGOT_PASSWORD_FAILURE;
  error: string;
}

export type ForgotPasswordActionTypes =
  | ForgotPasswordRequestAction
  | ForgotPasswordSuccessAction
  | ForgotPasswordFailureAction;
