import { SET_TAB } from "../actions/tab";

interface TabState {
  title: string;
}

export const initialState: TabState = {
  title: "bun",
};

export const tabReducer = (state = initialState, action: any): TabState => {
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
