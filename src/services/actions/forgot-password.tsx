import { request } from "../../utils/api";
import { AppDispatch } from "../store";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILURE = "FORGOT_PASSWORD_FAILURE";

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

export const forgotPassword = (email: string) => (dispatch: AppDispatch) => {
  dispatch({ type: FORGOT_PASSWORD_REQUEST });

  request("password-reset", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  })
    .then(() => {
      dispatch({ type: FORGOT_PASSWORD_SUCCESS });
      localStorage.setItem("visitedForgotPassword", "true");
    })
    .catch((error) => {
      dispatch({ type: FORGOT_PASSWORD_FAILURE, error: error.message });
    });
};
