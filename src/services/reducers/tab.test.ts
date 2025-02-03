import { tabReducer, initialState } from "./tab";
import { SET_TAB } from "../constants";
import { TabActionTypes } from "../types";

describe("tabReducer", () => {
  it("должен возвращать начальное состояние по умолчанию", () => {
    expect(tabReducer(undefined, {} as TabActionTypes)).toEqual(initialState);
  });

  it("должен изменять `title` при `SET_TAB`", () => {
    const newTab = "sauce";
    expect(
      tabReducer(initialState, {
        type: SET_TAB,
        payload: newTab,
      })
    ).toEqual({
      ...initialState,
      title: newTab,
    });
  });
});
