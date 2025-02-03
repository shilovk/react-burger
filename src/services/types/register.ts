import { REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "../constants";

interface RegisterRequestAction {
  type: typeof REGISTER_REQUEST;
}

interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
  payload: { accessToken: string; refreshToken: string };
}

interface RegisterFailureAction {
  type: typeof REGISTER_FAILURE;
  error: string;
}

export type RegisterActionTypes = RegisterRequestAction | RegisterSuccessAction | RegisterFailureAction;
