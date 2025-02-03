import { ingredientDetailsReducer, initialState } from "./ingredient-details";
import { SET_INGREDIENT_DETAILS, CLEAR_INGREDIENT_DETAILS } from "../constants";
import { IngredientDetailsActionTypes } from "../types";
import { Ingredient } from "../../components/burger-ingredients/burger-ingredients.types";

describe("ingredientDetailsReducer", () => {
  const mockIngredient: Ingredient = {
    _id: "1",
    name: "Bun",
    type: "bun",
    price: 10,
    proteins: 5,
    fat: 3,
    carbohydrates: 20,
    calories: 150,
    image: "https://example.com/bun.png",
    image_mobile: "https://example.com/bun-mobile.png",
    image_large: "https://example.com/bun-large.png",
    __v: 1,
  };

  it("должен возвращать начальное состояние по умолчанию", () => {
    expect(ingredientDetailsReducer(undefined, {} as IngredientDetailsActionTypes)).toEqual(initialState);
  });

  it("должен устанавливать `ingredient` при `SET_INGREDIENT_DETAILS`", () => {
    expect(
      ingredientDetailsReducer(initialState, {
        type: SET_INGREDIENT_DETAILS,
        payload: mockIngredient,
      })
    ).toEqual({
      ...initialState,
      ingredient: mockIngredient,
    });
  });

  it("должен очищать `ingredient` при `CLEAR_INGREDIENT_DETAILS`", () => {
    const stateWithIngredient = {
      ...initialState,
      ingredient: mockIngredient,
    };

    expect(
      ingredientDetailsReducer(stateWithIngredient, {
        type: CLEAR_INGREDIENT_DETAILS,
      })
    ).toEqual(initialState);
  });
});
