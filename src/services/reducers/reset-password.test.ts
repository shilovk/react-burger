import { resetPasswordReducer, initialState } from "./reset-password";
import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE } from "../constants";
import { ResetPasswordActionTypes } from "../types";

describe("resetPasswordReducer", () => {
  it("должен возвращать начальное состояние по умолчанию", () => {
    expect(resetPasswordReducer(undefined, {} as ResetPasswordActionTypes)).toEqual(initialState);
  });

  it("должен устанавливать `isLoading: true` при `RESET_PASSWORD_REQUEST`", () => {
    expect(resetPasswordReducer(initialState, { type: RESET_PASSWORD_REQUEST })).toEqual({
      isLoading: true,
      error: null,
      success: false,
    });
  });

  it("должен устанавливать `success: true` при `RESET_PASSWORD_SUCCESS`", () => {
    expect(resetPasswordReducer(initialState, { type: RESET_PASSWORD_SUCCESS })).toEqual({
      isLoading: false,
      error: null,
      success: true,
    });
  });

  it("должен устанавливать `error` при `RESET_PASSWORD_FAILURE`", () => {
    const errorMessage = "Password reset failed";
    expect(resetPasswordReducer(initialState, { type: RESET_PASSWORD_FAILURE, error: errorMessage })).toEqual({
      isLoading: false,
      error: errorMessage,
      success: false,
    });
  });
});
