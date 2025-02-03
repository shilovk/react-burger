import { SET_TAB } from "../constants";
import { SetTabAction } from "../types";

export const setTab = (tab: string): SetTabAction => ({
  type: SET_TAB,
  payload: tab,
});
