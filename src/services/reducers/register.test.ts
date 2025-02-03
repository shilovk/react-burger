import { registerReducer, initialState } from "./register";
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from "../constants";
import { RegisterActionTypes } from "../types";

describe("registerReducer", () => {
  it("должен возвращать начальное состояние по умолчанию", () => {
    expect(registerReducer(undefined, {} as RegisterActionTypes)).toEqual(initialState);
  });

  it("должен устанавливать `isLoading: true` при `REGISTER_REQUEST`", () => {
    expect(registerReducer(initialState, { type: REGISTER_REQUEST })).toEqual({
      isLoading: true,
      isAuthenticated: false,
      error: null,
      success: false,
    });
  });

  it("должен устанавливать `isAuthenticated: true` и `success: true` при `REGISTER_SUCCESS`", () => {
    expect(
      registerReducer(initialState, {
        type: REGISTER_SUCCESS,
        payload: { accessToken: "mockAccessToken", refreshToken: "mockRefreshToken" },
      })
    ).toEqual({
      isLoading: false,
      isAuthenticated: true,
      error: null,
      success: true,
    });
  });

  it("должен устанавливать `error` при `REGISTER_FAILURE`", () => {
    const errorMessage = "Registration failed";
    expect(registerReducer(initialState, { type: REGISTER_FAILURE, error: errorMessage })).toEqual({
      isLoading: false,
      isAuthenticated: false,
      error: errorMessage,
      success: false,
    });
  });
});
