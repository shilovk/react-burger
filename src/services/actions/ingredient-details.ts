import { Ingredient } from "../../components/burger-ingredients/burger-ingredients.types";

export const SET_INGREDIENT_DETAILS = "SET_INGREDIENT_DETAILS";
export const CLEAR_INGREDIENT_DETAILS = "CLEAR_INGREDIENT_DETAILS";

interface SetIngredientDetailsAction {
  type: typeof SET_INGREDIENT_DETAILS;
  payload: Ingredient;
}

interface ClearIngredientDetailsAction {
  type: typeof CLEAR_INGREDIENT_DETAILS;
}

export type IngredientDetailsActionTypes = SetIngredientDetailsAction | ClearIngredientDetailsAction;

export const setIngredientDetails = (ingredient: Ingredient): SetIngredientDetailsAction => ({
  type: SET_INGREDIENT_DETAILS,
  payload: ingredient,
});

export const clearIngredientDetails = (): ClearIngredientDetailsAction => ({
  type: CLEAR_INGREDIENT_DETAILS,
});
