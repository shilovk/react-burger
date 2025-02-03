import { CLEAR_INGREDIENT_DETAILS, SET_INGREDIENT_DETAILS } from "../constants";
import { Ingredient } from "../../components/burger-ingredients/burger-ingredients.types";

export interface SetIngredientDetailsAction {
  type: typeof SET_INGREDIENT_DETAILS;
  payload: Ingredient;
}

export interface ClearIngredientDetailsAction {
  type: typeof CLEAR_INGREDIENT_DETAILS;
}

export type IngredientDetailsActionTypes = SetIngredientDetailsAction | ClearIngredientDetailsAction;
