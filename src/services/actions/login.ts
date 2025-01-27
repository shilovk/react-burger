import { AppDispatch } from "../store";
import { request } from "../../utils/api";
import { NavigateFunction } from "react-router-dom";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const SET_AUTH_STATE = "SET_AUTH_STATE";

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: { accessToken: string; refreshToken: string };
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  error: string;
}

interface SetAuthStateAction {
  type: typeof SET_AUTH_STATE;
  isAuthenticated: boolean;
}

export type LoginActionTypes = LoginRequestAction | LoginSuccessAction | LoginFailureAction | SetAuthStateAction;

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
