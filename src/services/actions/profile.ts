import { request } from "../../utils/api";
import type { AppDispatch } from "../types";
import { SET_AUTH_STATE } from "./login";

export const PROFILE_REQUEST = "PROFILE_REQUEST";
export const PROFILE_SUCCESS = "PROFILE_SUCCESS";
export const PROFILE_FAILURE = "PROFILE_FAILURE";
export const PROFILE_UPDATE_SUCCESS = "PROFILE_UPDATE_SUCCESS";
export const PROFILE_LOGOUT = "PROFILE_LOGOUT";

interface ProfileRequestAction {
  type: typeof PROFILE_REQUEST;
}

interface ProfileSuccessAction {
  type: typeof PROFILE_SUCCESS;
  payload: { name: string; email: string };
}

interface ProfileUpdateSuccessAction {
  type: typeof PROFILE_UPDATE_SUCCESS;
  payload: { name: string; email: string };
}

interface ProfileFailureAction {
  type: typeof PROFILE_FAILURE;
  error: string | null;
}

interface ProfileLogoutAction {
  type: typeof PROFILE_LOGOUT;
}

export type ProfileActionTypes =
  | ProfileRequestAction
  | ProfileSuccessAction
  | ProfileUpdateSuccessAction
  | ProfileFailureAction
  | ProfileLogoutAction;

export const updateProfile = (name: string, email: string, password: string) => (dispatch: AppDispatch) => {
  dispatch({ type: PROFILE_REQUEST });

  request("auth/user", {
    method: "PATCH",
    headers: {
      Authorization: sessionStorage.getItem("accessToken") || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then(() => {
      dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: { name, email } });
    })
    .catch((error) => {
      dispatch({ type: PROFILE_FAILURE, error: error.message });
    });
};

export const fetchProfile = () => (dispatch: AppDispatch) => {
  dispatch({ type: PROFILE_REQUEST });

  request("auth/user", {
    method: "GET",
    headers: { Authorization: sessionStorage.getItem("accessToken") || "" },
  })
    .then((data) => {
      dispatch({
        type: PROFILE_SUCCESS,
        payload: { name: data.user.name, email: data.user.email },
      });
    })
    .catch((error) => {
      dispatch({ type: PROFILE_FAILURE, error: error.message });
    });
};

export const logout = () => (dispatch: AppDispatch) => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    dispatch({ type: PROFILE_FAILURE, error: "Токен не найден" });
    return;
  }

  request("auth/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: refreshToken }),
  })
    .then(() => {
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("accessToken");

      dispatch({ type: PROFILE_LOGOUT });
      dispatch({ type: SET_AUTH_STATE, isAuthenticated: false });
    })
    .catch((error) => {
      dispatch({ type: PROFILE_FAILURE, error: error.message });
    });
};
