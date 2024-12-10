import type { AppDispatch } from "../store";
import { BASE_URL } from "../../components/@types/api";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

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

export type registerActionTypes =
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterFailureAction;

export const register =
  (email: string, password: string, name: string) =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Ошибка регистрации");
      }

      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        },
      });

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    } catch (error: any) {
      dispatch({ type: REGISTER_FAILURE, error: error.message });
    }
  };
