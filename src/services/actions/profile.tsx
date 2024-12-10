import { BASE_URL } from "../../components/@types/api";
import { AppDispatch } from "../store";
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

export const profileFailure = (error?: string): ProfileFailureAction => ({
  type: PROFILE_FAILURE,
  error: error ?? null,
});

export const fetchProfile = () => async (dispatch: AppDispatch) => {
  dispatch({ type: PROFILE_REQUEST });

  const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return null;

    try {
      const response = await fetch(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: refreshToken }),
      });

      const data = await response.json();
      if (!response.ok || !data.success)
        throw new Error("Ошибка обновления токена");

      sessionStorage.setItem("accessToken", data.accessToken);
      if (data.refreshToken)
        localStorage.setItem("refreshToken", data.refreshToken);

      return data.accessToken;
    } catch {
      return null;
    }
  };

  try {
    let token = sessionStorage.getItem("accessToken");
    if (!token) throw new Error("Токен не найден");

    let response = await fetch(`${BASE_URL}/auth/user`, {
      method: "GET",
      headers: { Authorization: token },
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.message === "jwt expired") {
        token = await refreshAccessToken();
        if (token) {
          response = await fetch(`${BASE_URL}/auth/user`, {
            method: "GET",
            headers: { Authorization: token },
          });
        } else throw new Error("Не удалось обновить токен");
      } else throw new Error(errorData.message);
    }

    const data = await response.json();
    if (data.success) {
      dispatch({
        type: PROFILE_SUCCESS,
        payload: { name: data.user.name, email: data.user.email },
      });
    } else {
      throw new Error("Ошибка получения данных");
    }
  } catch (error: any) {
    dispatch(profileFailure(error.message));
  }
};

export const updateProfile =
  (name: string, email: string, password: string) =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: PROFILE_REQUEST });

    const token = sessionStorage.getItem("accessToken");
    if (!token) return dispatch(profileFailure("Токен не найден"));

    try {
      const response = await fetch(`${BASE_URL}/auth/user`, {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (data.success) {
        dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: { name, email } });
      } else {
        throw new Error("Ошибка обновления данных");
      }
    } catch (error: any) {
      dispatch(profileFailure(error.message));
    }
  };

export const logout = () => async (dispatch: AppDispatch) => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    dispatch(profileFailure("Токен не найден"));
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: refreshToken }),
    });

    const data = await response.json();
    if (data.success) {
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("accessToken");

      dispatch({ type: PROFILE_LOGOUT });
      dispatch({ type: SET_AUTH_STATE, isAuthenticated: false });
    } else {
      throw new Error("Ошибка выхода");
    }
  } catch (error: any) {
    dispatch(profileFailure(error.message));
  }
};
