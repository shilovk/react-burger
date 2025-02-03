import { AppDispatch } from "../types";
import { request } from "../../utils/api";
import { Ingredient } from "../../components/burger-ingredients/burger-ingredients.types";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const INCREMENT_INGREDIENT_COUNT = "INCREMENT_INGREDIENT_COUNT";
export const DECREMENT_INGREDIENT_COUNT = "DECREMENT_INGREDIENT_COUNT";
export const RESET_INGREDIENT_COUNTS = "RESET_INGREDIENT_COUNTS";

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

interface IncrementIngredientCountAction {
  type: typeof INCREMENT_INGREDIENT_COUNT;
  payload: { id: string; incrementBy: number };
}

interface DecrementIngredientCountAction {
  type: typeof DECREMENT_INGREDIENT_COUNT;
  payload: { id: string; decrementBy: number };
}

interface ResetIngredientCountsAction {
  type: typeof RESET_INGREDIENT_COUNTS;
}

export type BurgerIngredientsActionTypes =
  | GetIngredientsRequestAction
  | GetIngredientsSuccessAction
  | GetIngredientsFailedAction
  | IncrementIngredientCountAction
  | DecrementIngredientCountAction
  | ResetIngredientCountsAction;

export const incrementIngredientCount = (id: string, incrementBy = 1): IncrementIngredientCountAction => ({
  type: INCREMENT_INGREDIENT_COUNT,
  payload: { id, incrementBy },
});

export const decrementIngredientCount = (id: string, decrementBy = 1): DecrementIngredientCountAction => ({
  type: DECREMENT_INGREDIENT_COUNT,
  payload: { id, decrementBy },
});

export const getIngredients = () => (dispatch: AppDispatch) => {
  dispatch({ type: GET_INGREDIENTS_REQUEST });

  request("ingredients")
    .then((data) => {
      dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: data.data });
    })
    .catch((error) => {
      dispatch({ type: GET_INGREDIENTS_FAILED, error: error.message });
    });
};

export const resetIngredientCounts = (): ResetIngredientCountsAction => ({
  type: RESET_INGREDIENT_COUNTS,
});
