import { IngredientDetails } from "../../components/burger-ingredients/ingredient-details/ingredient-details.types";

export const SET_INGREDIENT_DETAILS = "SET_INGREDIENT_DETAILS";
export const CLEAR_INGREDIENT_DETAILS = "CLEAR_INGREDIENT_DETAILS";

export const setIngredientDetails = (ingredient: IngredientDetails) => ({
  type: SET_INGREDIENT_DETAILS,
  payload: ingredient,
});

export const clearIngredientDetails = () => ({
  type: CLEAR_INGREDIENT_DETAILS,
});
