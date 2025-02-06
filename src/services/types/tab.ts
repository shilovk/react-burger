import { SET_TAB } from "../constants";

export interface SetTabAction {
  type: typeof SET_TAB;
  payload: string;
}

export type TabActionTypes = SetTabAction;
