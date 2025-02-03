import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREMENT_INGREDIENT_COUNT,
  DECREMENT_INGREDIENT_COUNT,
  RESET_INGREDIENT_COUNTS,
} from "../constants";
import type { BurgerIngredientsActionTypes } from "../types";
import type { Ingredient } from "../../components/burger-ingredients/burger-ingredients.types";

export interface BurgerIngredientsState {
  ingredients: (Ingredient & { count: number })[];
  isLoading: boolean;
  hasError: boolean;
}

export const initialState: BurgerIngredientsState = {
  ingredients: [],
  isLoading: false,
  hasError: false,
};

export const burgerIngredientsReducer = (
  state: BurgerIngredientsState = initialState,
  action: BurgerIngredientsActionTypes
): BurgerIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.payload.map((ingredient) => ({
          ...ingredient,
          count: 0,
        })),
        isLoading: false,
        hasError: false,
      };
    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    case INCREMENT_INGREDIENT_COUNT:
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient) =>
          ingredient._id === action.payload.id
            ? { ...ingredient, count: ingredient.count + action.payload.incrementBy }
            : ingredient
        ),
      };
    case DECREMENT_INGREDIENT_COUNT:
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient) =>
          ingredient._id === action.payload.id
            ? { ...ingredient, count: Math.max(ingredient.count - action.payload.decrementBy, 0) }
            : ingredient
        ),
      };
    case RESET_INGREDIENT_COUNTS:
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient) => ({
          ...ingredient,
          count: 0,
        })),
      };
    default:
      return state;
  }
};
