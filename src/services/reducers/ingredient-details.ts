import { SET_INGREDIENT_DETAILS, CLEAR_INGREDIENT_DETAILS } from "../constants";
import { IngredientDetailsActionTypes } from "../types";
import { Ingredient } from "../../components/burger-ingredients/burger-ingredients.types";

interface IngredientDetailsState {
  ingredient: Ingredient | null;
}

export const initialState: IngredientDetailsState = {
  ingredient: null,
};

export const ingredientDetailsReducer = (
  state = initialState,
  action: IngredientDetailsActionTypes
): IngredientDetailsState => {
  switch (action.type) {
    case SET_INGREDIENT_DETAILS:
      return {
        ...state,
        ingredient: action.payload,
      };

    case CLEAR_INGREDIENT_DETAILS:
      return {
        ...state,
        ingredient: null,
      };

    default:
      return state;
  }
};
