export const SET_TAB = "SET_TAB";

interface SetTabAction {
  type: typeof SET_TAB;
  payload: string;
}

export type TabActionTypes = SetTabAction;

export const setTab = (tab: string): SetTabAction => ({
  type: SET_TAB,
  payload: tab,
});
