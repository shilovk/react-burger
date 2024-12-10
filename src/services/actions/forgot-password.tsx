import { BASE_URL } from "../../components/@types/api";
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

export const forgotPassword =
  (email: string) => async (dispatch: AppDispatch) => {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    try {
      const response = await fetch(`${BASE_URL}/password-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Ошибка отправки запроса");
      }

      dispatch({ type: FORGOT_PASSWORD_SUCCESS });

      localStorage.setItem("visitedForgotPassword", "true");
    } catch (error: any) {
      dispatch({ type: FORGOT_PASSWORD_FAILURE, error: error.message });
    }
  };
