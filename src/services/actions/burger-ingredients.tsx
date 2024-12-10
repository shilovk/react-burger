import { BASE_URL } from "../../components/@types/api";
import { checkResponse } from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const INCREMENT_INGREDIENT_COUNT = "INCREMENT_INGREDIENT_COUNT";
export const DECREMENT_INGREDIENT_COUNT = "DECREMENT_INGREDIENT_COUNT";
export const RESET_INGREDIENT_COUNTS = "RESET_INGREDIENT_COUNTS";

export const incrementIngredientCount = (id: string, incrementBy = 1) => ({
  type: INCREMENT_INGREDIENT_COUNT,
  payload: { id, incrementBy },
});

export const decrementIngredientCount = (id: string, decrementBy = 1) => ({
  type: DECREMENT_INGREDIENT_COUNT,
  payload: { id, decrementBy },
});

export const getIngredients = () => {
  return async (
    dispatch: (arg0: { type: string; payload?: any; error?: any }) => void,
  ) => {
    dispatch({ type: GET_INGREDIENTS_REQUEST });

    fetch(`${BASE_URL}/ingredients`)
      .then(checkResponse)
      .then((data) => {
        dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: data.data });
      })
      .catch((error) => {
        dispatch({ type: GET_INGREDIENTS_FAILED, error: error.message });
      });
  };
};

export const resetIngredientCounts = () => ({
  type: RESET_INGREDIENT_COUNTS,
});
