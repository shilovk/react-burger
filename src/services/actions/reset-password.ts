import type { AppDispatch } from "../store";
import { request } from "../../utils/api";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE";

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

export const resetPassword = (password: string, token: string) => async (dispatch: AppDispatch) => {
  dispatch({ type: RESET_PASSWORD_REQUEST });

  request("password-reset/reset", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, token }),
  })
    .then(() => {
      dispatch({ type: RESET_PASSWORD_SUCCESS });
    })
    .catch((error) => {
      dispatch({ type: RESET_PASSWORD_FAILURE, error: error.message });
    });
};
