import { RESET_PASSWORD_FAILURE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from "../constants";

interface ResetPasswordRequestAction {
  type: typeof RESET_PASSWORD_REQUEST;
}

interface ResetPasswordSuccessAction {
  type: typeof RESET_PASSWORD_SUCCESS;
}

interface ResetPasswordFailureAction {
  type: typeof RESET_PASSWORD_FAILURE;
  error: string;
}

export type ResetPasswordActionTypes =
  | ResetPasswordRequestAction
  | ResetPasswordSuccessAction
  | ResetPasswordFailureAction;
