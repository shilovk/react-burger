import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from "../constants";
import type { RegisterActionTypes } from "../types";

interface RegisterState {
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  success: boolean;
}

export const initialState: RegisterState = {
  isLoading: false,
  isAuthenticated: false,
  error: null,
  success: false,
};

export const registerReducer = (state = initialState, action: RegisterActionTypes): RegisterState => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { ...state, isLoading: true, error: null, success: false };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        success: true,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        success: false,
      };
    default:
      return state;
  }
};
