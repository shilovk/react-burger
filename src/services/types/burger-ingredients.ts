import {
  DECREMENT_INGREDIENT_COUNT,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  INCREMENT_INGREDIENT_COUNT,
  RESET_INGREDIENT_COUNTS,
} from "../constants";
import { Ingredient } from "../../components/burger-ingredients/burger-ingredients.types";

interface GetIngredientsRequestAction {
  type: typeof GET_INGREDIENTS_REQUEST;
}

interface GetIngredientsSuccessAction {
  type: typeof GET_INGREDIENTS_SUCCESS;
  payload: Ingredient[];
}

interface GetIngredientsFailedAction {
  type: typeof GET_INGREDIENTS_FAILED;
  error: string;
}

export interface IncrementIngredientCountAction {
  type: typeof INCREMENT_INGREDIENT_COUNT;
  payload: { id: string; incrementBy: number };
}

export interface DecrementIngredientCountAction {
  type: typeof DECREMENT_INGREDIENT_COUNT;
  payload: { id: string; decrementBy: number };
}

export interface ResetIngredientCountsAction {
  type: typeof RESET_INGREDIENT_COUNTS;
}

export type BurgerIngredientsActionTypes =
  | GetIngredientsRequestAction
  | GetIngredientsSuccessAction
  | GetIngredientsFailedAction
  | IncrementIngredientCountAction
  | DecrementIngredientCountAction
  | ResetIngredientCountsAction;
