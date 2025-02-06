import type { AppDispatch } from "../types";
import { request } from "../../utils/api";
import { RESET_PASSWORD_FAILURE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from "../constants";

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
