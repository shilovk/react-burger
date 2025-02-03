import { profileReducer, initialState } from "./profile";
import {
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_LOGOUT,
} from "../constants";
import { ProfileActionTypes } from "../types";

describe("profileReducer", () => {
  it("должен возвращать начальное состояние по умолчанию", () => {
    expect(profileReducer(undefined, {} as ProfileActionTypes)).toEqual(initialState);
  });

  it("должен устанавливать `isLoading: true` при `PROFILE_REQUEST`", () => {
    expect(profileReducer(initialState, { type: PROFILE_REQUEST })).toEqual({
      isLoading: true,
      name: "",
      email: "",
      error: null,
      successMessage: null,
    });
  });

  it("должен устанавливать `name` и `email` при `PROFILE_SUCCESS`", () => {
    expect(
      profileReducer(initialState, {
        type: PROFILE_SUCCESS,
        payload: { name: "John Doe", email: "john@example.com" },
      })
    ).toEqual({
      isLoading: false,
      name: "John Doe",
      email: "john@example.com",
      error: null,
      successMessage: null,
    });
  });

  it("должен обновлять `name` и `email` при `PROFILE_UPDATE_SUCCESS`", () => {
    expect(
      profileReducer(initialState, {
        type: PROFILE_UPDATE_SUCCESS,
        payload: { name: "Jane Doe", email: "jane@example.com" },
      })
    ).toEqual({
      isLoading: false,
      name: "Jane Doe",
      email: "jane@example.com",
      error: null,
      successMessage: null,
    });
  });

  it("должен устанавливать `error` при `PROFILE_FAILURE`", () => {
    const errorMessage = "Ошибка профиля";
    expect(profileReducer(initialState, { type: PROFILE_FAILURE, error: errorMessage })).toEqual({
      isLoading: false,
      name: "",
      email: "",
      error: errorMessage,
      successMessage: null,
    });
  });

  it("должен сбрасывать состояние при `PROFILE_LOGOUT`", () => {
    const modifiedState = {
      isLoading: false,
      name: "Test User",
      email: "test@example.com",
      error: "Some error",
      successMessage: "Updated",
    };

    expect(profileReducer(modifiedState, { type: PROFILE_LOGOUT })).toEqual(initialState);
  });
});
