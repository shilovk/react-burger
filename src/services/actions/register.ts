import type { AppDispatch } from "../types";
import { request } from "../../utils/api";
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from "../constants";

export const register = (email: string, password: string, name: string) => (dispatch: AppDispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  request("auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  })
    .then((data) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        },
      });

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    })
    .catch((error) => {
      dispatch({ type: REGISTER_FAILURE, error: error.message });
    });
};
