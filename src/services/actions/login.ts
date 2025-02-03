import { AppDispatch } from "../types";
import { request } from "../../utils/api";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SET_AUTH_STATE } from "../constants";

export const setAuthState = () => (dispatch: AppDispatch) => {
  const accessToken = sessionStorage.getItem("accessToken");
  dispatch({ type: SET_AUTH_STATE, isAuthenticated: !!accessToken });
};

export const login = (email: string, password: string) => (dispatch: AppDispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  request("auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        },
      });

      localStorage.setItem("refreshToken", data.refreshToken);
      sessionStorage.setItem("accessToken", data.accessToken);

      dispatch(setAuthState());
    })
    .catch((error) => {
      dispatch({ type: LOGIN_FAILURE, error: error.message });
    });
};
