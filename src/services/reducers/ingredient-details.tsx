import {
  SET_INGREDIENT_DETAILS,
  CLEAR_INGREDIENT_DETAILS,
} from "../actions/ingredient-details";
import { IngredientDetails } from "../../components/burger-ingredients/ingredient-details/ingredient-details.types";

interface IngredientDetailsState {
  ingredient: IngredientDetails | null;
}

export const initialState: IngredientDetailsState = {
  ingredient: null,
};

export const ingredientDetailsReducer = (
  state = initialState,
  action: { type: string; payload?: IngredientDetails },
): IngredientDetailsState => {
  switch (action.type) {
    case SET_INGREDIENT_DETAILS:
      return {
        ...state,
        ingredient: action.payload || null,
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
