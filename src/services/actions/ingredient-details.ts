import { Ingredient } from "../../components/burger-ingredients/burger-ingredients.types";
import { SET_INGREDIENT_DETAILS, CLEAR_INGREDIENT_DETAILS } from "../constants";
import type { SetIngredientDetailsAction, ClearIngredientDetailsAction } from "../types";

export const setIngredientDetails = (ingredient: Ingredient): SetIngredientDetailsAction => ({
  type: SET_INGREDIENT_DETAILS,
  payload: ingredient,
});

export const clearIngredientDetails = (): ClearIngredientDetailsAction => ({
  type: CLEAR_INGREDIENT_DETAILS,
});
