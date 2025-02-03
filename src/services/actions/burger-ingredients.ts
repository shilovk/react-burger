import { AppDispatch } from "../types";
import { request } from "../../utils/api";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREMENT_INGREDIENT_COUNT,
  DECREMENT_INGREDIENT_COUNT,
  RESET_INGREDIENT_COUNTS,
} from "../constants";
import { IncrementIngredientCountAction, DecrementIngredientCountAction, ResetIngredientCountsAction } from "../types";

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
