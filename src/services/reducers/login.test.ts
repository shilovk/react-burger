import { loginReducer, initialState } from "./login";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SET_AUTH_STATE } from "../constants";
import { LoginActionTypes } from "../types";

describe("loginReducer", () => {
  it("должен возвращать начальное состояние по умолчанию", () => {
    expect(loginReducer(undefined, {} as LoginActionTypes)).toEqual(initialState);
  });

  it("должен устанавливать `isLoading: true` при `LOGIN_REQUEST`", () => {
    expect(loginReducer(initialState, { type: LOGIN_REQUEST })).toEqual({
      isLoading: true,
      isAuthenticated: false,
      error: null,
    });
  });

  it("должен устанавливать `isAuthenticated: true` при `LOGIN_SUCCESS`", () => {
    expect(
      loginReducer(initialState, {
        type: LOGIN_SUCCESS,
        payload: { accessToken: "mockAccessToken", refreshToken: "mockRefreshToken" }, // ✅ Добавили payload
      })
    ).toEqual({
      isLoading: false,
      isAuthenticated: true,
      error: null,
    });
  });

  it("должен устанавливать `error` при `LOGIN_FAILURE`", () => {
    const errorMessage = "Invalid credentials";
    expect(loginReducer(initialState, { type: LOGIN_FAILURE, error: errorMessage })).toEqual({
      isLoading: false,
      isAuthenticated: false,
      error: errorMessage,
    });
  });

  it("должен обновлять `isAuthenticated` при `SET_AUTH_STATE`", () => {
    expect(loginReducer(initialState, { type: SET_AUTH_STATE, isAuthenticated: true })).toEqual({
      isLoading: false,
      isAuthenticated: true,
      error: null,
    });

    expect(loginReducer(initialState, { type: SET_AUTH_STATE, isAuthenticated: false })).toEqual({
      isLoading: false,
      isAuthenticated: false,
      error: null,
    });
  });
});
