import { forgotPasswordReducer, initialState } from "./forgot-password";
import { FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE } from "../constants";
import { ForgotPasswordActionTypes } from "../types";

describe("forgotPasswordReducer", () => {
  it("должен возвращать начальное состояние по умолчанию", () => {
    expect(forgotPasswordReducer(undefined, {} as ForgotPasswordActionTypes)).toEqual(initialState);
  });

  it("должен устанавливать `isLoading: true` при `FORGOT_PASSWORD_REQUEST`", () => {
    expect(forgotPasswordReducer(initialState, { type: FORGOT_PASSWORD_REQUEST })).toEqual({
      isLoading: true,
      error: null,
      success: false,
    });
  });

  it("должен устанавливать `success: true` при `FORGOT_PASSWORD_SUCCESS`", () => {
    expect(forgotPasswordReducer(initialState, { type: FORGOT_PASSWORD_SUCCESS })).toEqual({
      isLoading: false,
      error: null,
      success: true,
    });
  });

  it("должен устанавливать `error` при `FORGOT_PASSWORD_FAILURE`", () => {
    const errorMessage = "Forgot password request failed";
    expect(forgotPasswordReducer(initialState, { type: FORGOT_PASSWORD_FAILURE, error: errorMessage })).toEqual({
      isLoading: false,
      error: errorMessage,
      success: false,
    });
  });
});
