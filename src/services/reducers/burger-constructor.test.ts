import { burgerConstructorReducer, initialState } from "./burger-constructor";
import { ADD_INGREDIENT, REMOVE_INGREDIENT, SET_BUN, REORDER_INGREDIENTS, CLEAR_CONSTRUCTOR } from "../constants";
import type { BurgerConstructorActionTypes } from "../types";

describe("burgerConstructorReducer", () => {
  it("должен возвращать начальное состояние по умолчанию", () => {
    expect(burgerConstructorReducer(undefined, {} as BurgerConstructorActionTypes)).toEqual(initialState);
  });

  it("должен добавлять ингредиент при `ADD_INGREDIENT`", () => {
    const newIngredient = { id: "123", uniqueId: "abc-123" };
    expect(burgerConstructorReducer(initialState, { type: ADD_INGREDIENT, payload: newIngredient })).toEqual({
      ingredients: [newIngredient],
      bun: null,
    });
  });

  it("должен удалять ингредиент при `REMOVE_INGREDIENT`", () => {
    const initialWithIngredients = {
      ingredients: [
        { id: "123", uniqueId: "abc-123" },
        { id: "456", uniqueId: "def-456" },
      ],
      bun: null,
    };
    expect(burgerConstructorReducer(initialWithIngredients, { type: REMOVE_INGREDIENT, payload: "123" })).toEqual({
      ingredients: [{ id: "456", uniqueId: "def-456" }],
      bun: null,
    });
  });

  it("должен устанавливать булку при `SET_BUN`", () => {
    expect(burgerConstructorReducer(initialState, { type: SET_BUN, payload: "bun-789" })).toEqual({
      ingredients: [],
      bun: "bun-789",
    });
  });

  it("должен менять порядок ингредиентов при `REORDER_INGREDIENTS`", () => {
    const initialWithIngredients = {
      ingredients: [
        { id: "123", uniqueId: "abc-123" },
        { id: "456", uniqueId: "def-456" },
      ],
      bun: null,
    };

    expect(
      burgerConstructorReducer(initialWithIngredients, {
        type: REORDER_INGREDIENTS,
        payload: { dragIndex: 0, hoverIndex: 1 },
      })
    ).toEqual({
      ingredients: [
        { id: "456", uniqueId: "def-456" },
        { id: "123", uniqueId: "abc-123" },
      ],
      bun: null,
    });
  });

  it("должен очищать конструктор при `CLEAR_CONSTRUCTOR`", () => {
    const initialWithData = {
      ingredients: [{ id: "123", uniqueId: "abc-123" }],
      bun: "bun-789",
    };

    expect(burgerConstructorReducer(initialWithData, { type: CLEAR_CONSTRUCTOR })).toEqual(initialState);
  });
});
