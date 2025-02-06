import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SET_AUTH_STATE } from "../constants";

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
