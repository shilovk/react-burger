import { request } from "../../utils/api";
import { AppDispatch } from "../types";
import { FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS } from "../constants";

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
