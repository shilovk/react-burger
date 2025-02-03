import { SET_TAB, TabActionTypes } from "../actions/tab";

interface TabState {
  title: string;
}

export const initialState: TabState = {
  title: "bun",
};

export const tabReducer = (state = initialState, action: TabActionTypes): TabState => {
  switch (action.type) {
    case SET_TAB:
      return {
        ...state,
        title: action.payload,
      };
    default:
      return state;
  }
};
