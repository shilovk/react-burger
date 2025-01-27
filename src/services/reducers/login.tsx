import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SET_AUTH_STATE, LoginActionTypes } from "../actions/login";

interface LoginState {
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export const initialState: LoginState = {
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

export const loginReducer = (state = initialState, action: LoginActionTypes): LoginState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isLoading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, isLoading: false, isAuthenticated: true };
    case LOGIN_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    case SET_AUTH_STATE:
      return { ...state, isAuthenticated: action.isAuthenticated };
    default:
      return state;
  }
};
